import BinanceClient, { Binance } from 'binance-api-node';

const isTestApi = process.env.BINANCE_TESTNET_ENABLED === 'true';
const config = {
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
  httpBase: 'https://testnet.binance.vision',
};

export default (apiKey = '', apiSecret = ''): Binance => {
  if (isTestApi && (!config.apiKey || !config.apiSecret)) throw new Error('Please set binance test api keys in env');
  else if (!isTestApi) {
    config.apiKey = apiKey;
    config.apiSecret = apiSecret;
    config.httpBase = 'https://api.binance.com';
  }

  return BinanceClient(config);
};
