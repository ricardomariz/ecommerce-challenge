import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';

import { AppError } from './errors/AppErrors';
import { router } from './routes';

import './database';
import './shared/container';
import './shared/container/providers/MailProvider';

const app = express();

app.use(express.json());

app.use('/tmp', express.static(path.join(__dirname, '../tmp')));

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log('Server is running!!'));
