import { Request, Response } from 'express';
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

    app.use((err: Error, req: Request, res: Response) => {
      logger.error({ err, req });
      res.status(500);
      res.end();
    });

    try {
      await mongoose.connect(MONGODB_URI);

      // @ts-ignore
      agenda.mongo(mongoose.connection.getClient().db(), 'jobs');
      await agenda.start();
    } catch (err) {
      logger.error('mongoose.connect', { err });
    }

    if (process.env.NODE_ENV !== 'production') {
      const chokidar = require('chokidar');
      const watcher = chokidar.watch('./dist');

      watcher.on('ready', function () {
        watcher.on('all', function () {
          console.log('Clearing /dist/ module cache from server');
          Object.keys(require.cache).forEach(function (id) {
            if (/[/\\]dist[/\\]/.test(id)) delete require.cache[id];
          });
        });
      });
    }

    app.listen(port, () => {
      logger.info(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    logger.error({ err });
    process.exit(1);
  }
})();

export default {};
