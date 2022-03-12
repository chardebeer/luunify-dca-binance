import nodemailer from 'nodemailer';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import EmailProvider from 'next-auth/providers/email';
import clientPromise from './mongodb';

export default {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  adapter: MongoDBAdapter(clientPromise),
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
};

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
