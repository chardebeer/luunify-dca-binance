import nodemailer from 'nodemailer';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import client from 'server/lib/mongoClient';
import mongoose from 'mongoose';
import { User } from 'types';
// @ts-ignore
// agenda.mongo(mongoose.connection.getClient().db(), 'jobs');
// await agenda.start();
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
    async session({ session, token }) {
      const user: User | null = await mongoose.model('User').findOne({ email: token.email }).lean();

      session.user = user?.timezone ? user : await updateUser(token.email || '');

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
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone.toString(),
    telegram: {
      botToken: TELEGRAM_BOT_TOKEN,
      chatId: TELEGRAM_CHAT_ID,
      enabled: TELEGRAM_ENABLED === 'true',
    },
  };

  return await mongoose
    .model('User')
    .findOneAndUpdate({ email }, { $set: updateDoc }, { new: true, upsert: true, runValidators: true })
    .lean();
}
