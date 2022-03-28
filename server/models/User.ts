import { Schema, model, ValidatorProps } from 'mongoose';
import moment from 'moment-timezone';

const { TELEGRAM_BOT_TOKEN = '', TELEGRAM_CHAT_ID = '', TELEGRAM_ENABLED } = process.env;

export default model(
  'User',
  new Schema({
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      isReuries: [true, 'Email address is required'],
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },

    name: {
      type: String,
      trim: true,
    },

    binance: {
      apiKey: { type: String, trim: true },
      apiSecret: { type: String, trim: true },
      update: { type: Boolean, default: false },
    },

    telegram: {
      botToken: { type: String, defualt: TELEGRAM_BOT_TOKEN },
      chatId: { type: String, default: TELEGRAM_CHAT_ID },
      enabled: { type: Boolean, default: TELEGRAM_ENABLED === 'true' },
    },

    timezone: {
      default: Intl.DateTimeFormat().resolvedOptions().timeZone,
      type: String,
      validate: {
        message: ({ value }: ValidatorProps) => `${value} is not a valid timezone`,
        validator: function (tz: string) {
          if (tz) {
            return moment.tz.zone(tz) !== null;
          }
          return true;
        },
      },
    },

    subscriptionUntil: Date,
  })
);

function validateEmail(email: string) {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}
