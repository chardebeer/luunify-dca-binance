import { Router } from 'express';
import { getToken } from 'next-auth/jwt';
import controller from './controller';

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

router.get('/api/balance', async (_, res, next) => {
  try {
    res.json({ data: await controller.fetchAccountBalance() });
  } catch (err) {
    next(err);
  }
});

router.patch('/api/settings/general', async (req, res, next) => {
  try {
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
      const token = await getToken({ req });
      const { status, ...payload } = await controller.createJob({ ...req.body, userEmail: token?.email });

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
    const { orderId, symbol } = req.body;
    const { status, ...payload } = await controller.updateOrderStatus({
      orderId,
      symbol,
    });

    res.status(status).json(payload);
  } catch (err) {
    next(err);
  }
});

export default router;
