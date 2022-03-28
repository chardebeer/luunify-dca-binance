import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import next from 'next';
import path from 'path';
import app from './app';
import agenda from './lib/agenda';
import rootLogger from './lib/logger';
import sentry from './lib/sentry';

const port = Number(process.env.PORT) || 80;
const MONGODB_URI = process.env.MONGODB_URI || '';
const dev = process.env.NODE_ENV === 'development';
const nextApp = next({ dev, dir: path.dirname(__dirname) });
const handler = nextApp.getRequestHandler();
const logger = rootLogger.child({ module: 'app' });

(async function start() {
  try {
    await nextApp.prepare();

    app.all('*', (req, res) => {
      if (req.url.startsWith('/api/auth/')) {
        req.query.nextauth = req.url.slice('/api/auth/'.length).replace(/\?.*/, '').split('/');
      }
      handler(req, res);
    });

    app.use(sentry.Handlers.errorHandler());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      logger.error({ err, req });
      res.status(500);
      res.end();
    });

    app.use((req, _, next) => {
      if (req.url.startsWith('/coinbase-notification')) {
        let data = '';

        req.on('data', function (chunk) {
          data += chunk;
        });

        req.on('end', function () {
          (req as any).rawBody = data;
          next();
        });
      } else {
        next();
      }
    });

    await mongoose.connect(MONGODB_URI);

    // @ts-ignore
    agenda.mongo(mongoose.connection.getClient().db(), 'jobs');
    await agenda.start();

    app.listen(port, () => {
      logger.info(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    logger.error({ err });
    process.exit(1);
  }
})();
