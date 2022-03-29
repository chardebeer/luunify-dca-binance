import cronstrue from 'cronstrue';
import moment from 'moment-timezone';
import Joi, { PresenceMode, ValidationError } from 'joi';
import binance from './lib/binance';
import CryptoJS from 'crypto-js';

export type JobConfig = {
  amount: string;
  jobName: string;
  schedule: string;
  quoteAsset: string;
  symbol: string;
  timezone: string;
  useDefaultTimezone: boolean;
  userEmail: string;
  apiKey: string;
  apiSecret: string;
};

// Joi validation functions

export function validateTimezone(tz: string, helper: Joi.CustomHelpers) {
  const timezone = moment.tz.zone(tz);
  if (!timezone) {
    return helper.message({ custom: `Timezone ${tz} is invalid` });
  }
  return timezone.name;
}

function validateCronSyntax(schedule: string, helper: any) {
  try {
    return cronstrue.toString(schedule).length ? schedule : helper.message(`Cron syntax ${schedule} is invalid`);
  } catch {
    return helper.message(`Cron syntax ${schedule} is invalid`);
  }
}

export function formatDateString(date: Date, options = {}) {
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    hour: '2-digit',
    year: 'numeric',
    month: 'short',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'long',
    ...options,
  });
}

export async function validateJobConfig(config: Partial<JobConfig>, mode: PresenceMode = 'required') {
  const schema = Joi.object({
    amount: Joi.number().presence(mode),
    paused: Joi.bool(),
    jobName: Joi.string().presence(mode),
    schedule: Joi.string().presence(mode).custom(validateCronSyntax),
    symbol: Joi.string()
      .presence(mode)
      .external(async (value) => {
        if (mode === 'required') {
          try {
            // @ts-ignore
            await binance().exchangeInfo({ symbol: value });
          } catch {
            throw new ValidationError('', [{ message: `Failed to validate symbol: ${value}` }], null);
          }
        }
      }),
    timezone: Joi.string().presence(mode).custom(validateTimezone),
    quoteAsset: Joi.string()
      .presence(mode)
      .custom((value, helpers) => {
        if (config.symbol?.endsWith(value)) {
          return value;
        }
        return helpers.message({ custom: `${value} is an invalid asset.` });
      }),
    useDefaultTimezone: Joi.bool().presence(mode),
    userEmail: Joi.string().presence(mode),
    apiKey: Joi.string().presence('required'),
    apiSecret: Joi.string().presence('required'),
  })
    .oxor('enable', 'disable')
    .messages({
      'object.oxor': "You can specify either 'enable' or 'disable' not both.",
    });
  const validatedConfig = await schema.validateAsync(config);
  return validatedConfig;
}

export function handleJoiValidationError(err: Error) {
  if (err instanceof ValidationError) {
    const [{ message }] = err.details;
    return { status: 400, message };
  }
  throw err;
}

export function flattenObject(object: { [key: string]: any } = {}) {
  const document: { [key: string]: any } = {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = object[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nested = flattenObject(value);
      const nestedKeys = Object.keys(nested);

      for (let n = 0; n < nestedKeys.length; n += 1) {
        const nestedKey = nestedKeys[n];
        document[`${key}.${nestedKey}`] = nested[nestedKey];
      }
    } else {
      document[key] = value;
    }
  }

  return document;
}

export function encrypt(str: string) {
  if (!process.env.ENCRYPTION_KEY) throw new Error('ENCRYPTION_KEY required in env');
  return CryptoJS.AES.encrypt(JSON.stringify({ str }), process.env.ENCRYPTION_KEY).toString();
}

export function decrypt(str: string) {
  if (!process.env.ENCRYPTION_KEY) throw new Error('ENCRYPTION_KEY required in env');
  return CryptoJS.AES.decrypt(str.toString(), process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
}
