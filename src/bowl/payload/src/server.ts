import { keeper } from '@websolutespa/dotenv-keeper';
import express from 'express';
import * as path from 'path';
import payload from 'payload';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();

keeper().then(config => {

  const env = config.parsed;
  const basePath = env.PAYLOAD_PUBLIC_BASE_PATH || '';

  const app = express();

  app.use(`${basePath}/assets`, express.static(path.resolve(__dirname, './assets')));

  // Redirect root to Admin panel
  app.get(`${basePath}/`, (_, res) => {
    res.redirect(`${basePath}/admin`);
  });

  // Initialize Payload
  payload.init({
    secret: env.PAYLOAD_SECRET,
    mongoURL: env.MONGODB_URI,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here
  const port = env.PORT ? parseInt(env.PORT) : 4000;
  app.listen(port);

});
