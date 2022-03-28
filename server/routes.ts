import { Router } from 'express';
import { getToken } from 'next-auth/jwt';
import { Client, resources, Webhook } from 'coinbase-commerce-node';
import controller from './controller';
import { encrypt } from './utils';
import express from 'express';

Client.init('5a66701a-9784-4274-be6f-4fc947215a71');
const { Charge } = resources;

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
  const chargeData = {
    name: 'Muunbot',
    description: 'Muunbot subscription',
    local_price: {
      amount: 10.0,
      currency: 'USD',
    },
    pricing_type: 'fixed_price',
    metadata: {
      user: req.query.email,
    },
  };

  try {
    res.status(200).json(await Charge.create(chargeData as any));
  } catch (err) {
    next(err);
  }
});

router.post(
  '/coinbase-notification',
  express.json({
    verify: (req, _, buf) => {
      (req as any).rawBody = buf;
    },
  }),
  async (req, res) => {
    const signature = req.headers['x-cc-webhook-signature'] || '';
    const rawBody = (req as any).rawBody;
    console.log('raw.body,', rawBody);
    try {
      const event = Webhook.verifyEventBody(rawBody, signature as string, process.env.WEBHOOK_SECRET as string);
      console.log('e', JSON.stringify(event));

      if (event.type === 'charge:pending') {
        // TODO
        // user paid, but transaction not confirm on blockchain yet
      }

      if (event.type === 'charge:confirmed') {
        // TODO
        // all good, charge confirmed
        //new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        // await mongoose
        //   .model('User')
        //   .findOneAndUpdate({ email }, { $set: updateDoc }, { new: true, upsert: true, runValidators: true })
        //   .lean();
      }

      if (event.type === 'charge:failed') {
        // TODO
        // charge failed or expired
      }

      res.status(200).send(`success ${event.id}`);
    } catch (error) {
      console.error(error);
      res.status(400).send('failure!');
    }
  }
);

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
