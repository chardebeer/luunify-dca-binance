import nodemailer from 'nodemailer';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import client from 'server/lib/mongoClient';
import mongoose from 'mongoose';
import { User } from 'types';
import { decrypt } from 'server/utils';

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
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        //THIS IS FOR EMAIL CUSTOMIZATION
        identifier: email,
        url,
        provider: { server, from },
      }) {
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
          user.binance.apiKey = undefined;
          user.binance.apiSecret = undefined;
        }

        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  debug: true,
});

function html({ url, host, email }: any) {
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`;
  // Your email content
  return `
      <body>
        <h1>Your Login link</h1>
        <h3>You requested a login form ${escapedEmail}</h3>
        <p>
          <a href="${url}">Login to ${escapedHost}</a>
      </body>
  `;
}

// Fallback for non-HTML email clients
function text({ url, host }: any) {
  return `Login to ${host}\n${url}\n\n`;
}

async function updateUser(email: string) {
  const { TELEGRAM_BOT_TOKEN = '', TELEGRAM_CHAT_ID = '', TELEGRAM_ENABLED } = process.env;

  const updateDoc = {
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

  return await mongoose
    .model('User')
    .findOneAndUpdate({ email }, { $set: updateDoc }, { new: true, upsert: true, runValidators: true })
    .lean();
}
