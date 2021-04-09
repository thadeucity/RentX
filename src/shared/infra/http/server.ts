import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '@shared/infra/typeorm';

import '@shared/container';

import { AppError } from '@errors/AppError';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);

    return res.status(500).json({
      status: 'error',
      message: `Internal Server Error ${err.message}`,
    });
  },
);

app.listen(3333, () => console.log('API up and running on port 3333'));
