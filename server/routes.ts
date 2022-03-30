import { Router } from 'express';
import { getToken } from 'next-auth/jwt';
import controller from './controller';
import { encrypt } from './utils';

const router = Router();

router.get('/api/timezones', (req, res) => {
  res.json({ data: controller.fetchTimezones(req.query.q as string) });
});

router.get('/api/symbols', async (req, res, next) => {
  try {
    res.json({ data: await controller.fetchSymbols(req.query.q as string) });
  } catch (err) {
    next(err);
  }
});

router.get('/api/balance', async (req, res, next) => {
  try {
    const { apiKey, apiSecret } = await getApiKeysFromToken(req);
    res.json({ data: await controller.fetchAccountBalance(apiKey, apiSecret) });
  } catch (err) {
    next(err);
  }
});

router.patch('/api/settings/general', async (req, res, next) => {
  try {
    if (req.headers.authorization?.startsWith('Basic ')) {
      const apiKeys = getApiKeysFromHeader(req.headers.authorization);
      req.body.binance.apiKey = apiKeys[0];
      req.body.binance.apiSecret = apiKeys[1];
    }

    const { status, ...payload } = await controller.updateSettings(req.body);
    res.status(status).json(payload);
  } catch (err) {
    next(err);
  }
});

router
  .route('/api/jobs')
  .get(async (req, res, next) => {
    try {
      const token = await getToken({ req });
      res.json({ data: await controller.fetchAllJobs(token?.email || '') });
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { email, apiKey, apiSecret } = await getApiKeysFromToken(req);
      const { status, ...payload } = await controller.createJob({
        ...req.body,
        userEmail: email,
        apiKey: encrypt(apiKey),
        apiSecret: encrypt(apiSecret),
      });

      res.status(status).json({ ...payload });
    } catch (err) {
      next(err);
    }
  });

router
  .route('/api/jobs/:jobId')
  .delete(async (req, res, next) => {
    try {
      const { status, ...payload } = await controller.deleteJob(req.params.jobId);
      res.status(status).json(payload);
    } catch (err) {
      next(err);
    }
  })
  .get(async (req, res, next) => {
    try {
      const { status, ...payload } = await controller.fetchJob(req.params.jobId);
      res.status(status).json(payload);
    } catch (err) {
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const { status, ...payload } = await controller.updateJob(req.params.jobId, req.body);
      res.status(status).json(payload);
    } catch (err) {
      next(err);
    }
  });

router.get('/api/jobs/:jobId/orders', async (req, res, next) => {
  try {
    res.json(await controller.getOrders(req.params.jobId));
  } catch (err) {
    next(err);
  }
});

router.patch('/api/orders/:orderId', async (req, res, next) => {
  try {
    const { apiKey, apiSecret } = await getApiKeysFromToken(req);
    const { orderId, symbol } = req.body;
    const { status, ...payload } = await controller.updateOrderStatus(
      {
        orderId,
        symbol,
      },
      apiKey,
      apiSecret
    );

    res.status(status).json(payload);
  } catch (err) {
    next(err);
  }
});

router.get('/api/createCharge', async (req, res, next) => {
  if (!process.env.COINBASE_API_KEY) {
    res.status(500).json({ error: 'COINBASE_API_KEY required in env' });
  } else {
    const chargeData = {
      name: 'Muunbot',
      description: 'Muunbot dca subscription',
      local_price: {
        amount: 10.0,
        currency: 'USD',
      },
      pricing_type: 'fixed_price',
      metadata: {
        email: req.query.email,
        subscription: req.query.subscription,
      },
    };

    try {
      const cbRes = await fetch('https://api.commerce.coinbase.com/charges/', {
        method: 'POST',
        body: JSON.stringify(chargeData),
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': process.env.COINBASE_API_KEY,
          'X-CC-Version': '2018-03-22',
        },
      });

      const json = await cbRes.json();

      if (!cbRes.ok || !json.data) {
        res.status(cbRes.status).json(json.error || cbRes.statusText);
      } else {
        res.status(200).json(json.data);
      }
    } catch (err) {
      next(err);
    }
  }
});

export default router;

async function getApiKeysFromToken(req: any) {
  const { email, apiKey, apiSecret } = (await getToken({ req })) as {
    email?: string;
    apiKey?: string;
    apiSecret?: string;
  };

  if (!apiKey || !apiSecret) throw new Error('Binance api keys not provided');
  return { email, apiKey, apiSecret };
}

function getApiKeysFromHeader(header: string) {
  const keys = Buffer.from(header.split(' ')[1], 'base64').toString('utf8').split(':');
  return [encrypt(keys[0]), encrypt(keys[1])];
}
