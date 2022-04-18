import nodemailer from 'nodemailer';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import client from 'server/lib/mongoClient';
import mongoose from 'mongoose';
import { User } from 'types';
import { decrypt, encrypt } from 'server/utils';
import logger from 'server/lib/logger';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 2592000,
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  adapter: MongoDBAdapter(client),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.SENDGRID_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Login to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email }),
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, isNewUser }) {
      try {
        if (isNewUser && token.email) {
          token.user = updateUser(token.email);
        } else if (token.email) {
          const user: User | null = await mongoose.model('User').findOne({ email: token.email }).lean();

          if (user?.binance.apiKey) {
            token.apiKey = decrypt(user.binance.apiKey || '');
            token.apiSecret = decrypt(user.binance.apiSecret || '');
            user.binance.apiKey = '****';
            user.binance.apiSecret = '****';
          } else if (user) {
            user.binance = { update: false };
            user.binance.apiKey = undefined;
            user.binance.apiSecret = undefined;
          }

          token.user = user;
        }
      } catch (err) {
        logger.error('updateUser', { err });
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user;
      return session;
    },
  },
  debug: true,
});

async function updateUser(email: string) {
  const { TELEGRAM_BOT_TOKEN = '', TELEGRAM_CHAT_ID = '', TELEGRAM_ENABLED } = process.env;

  const updateDoc: Partial<User> = {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    telegram: {
      botToken: TELEGRAM_BOT_TOKEN,
      chatId: TELEGRAM_CHAT_ID,
      enabled: TELEGRAM_ENABLED === 'true',
    },
    binance: {
      update: false,
    },
  };

  if (process.env.BINANCE_TESTNET_ENABLED === 'true' && updateDoc.binance) {
    updateDoc.binance.apiKey = encrypt(process.env.BINANCE_API_KEY || '');
    updateDoc.binance.apiSecret = encrypt(process.env.BINANCE_API_SECRET || '');
  }

  return await mongoose
    .model('User')
    .findOneAndUpdate({ email }, { $set: updateDoc }, { new: true, upsert: true, runValidators: true })
    .lean();
}

// Email HTML body
function html({ url, host, email }: Record<'url' | 'host' | 'email', string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`;

  // Some simple styling options
  const backgroundColor = '#f9f9f9';
  const textColor = '#444444';
  const mainBackgroundColor = '#ffffff';
  const buttonBackgroundColor = '#346df1';
  const buttonBorderColor = '#346df1';
  const buttonTextColor = '#ffffff';

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<'url' | 'host', string>) {
  return `Sign in to ${host}\n${url}\n\n`;
}
