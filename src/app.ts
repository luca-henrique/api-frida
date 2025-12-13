import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { apiReference } from '@scalar/express-api-reference';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const app = express();

app.use(express.json({ strict: false }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
        'img-src': ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
      },
    },
  })
);
app.use(morgan('dev'));

app.use('/api', routes);

const openApiSpec = yaml.load(
  fs.readFileSync(path.join(__dirname, '../docs/api/openapi.yaml'), 'utf8')
);

app.use(
  '/docs',
  apiReference({
    spec: {
      content: openApiSpec,
    },
  })
);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.json({ message: 'Frida API is running' });
});

export default app;
