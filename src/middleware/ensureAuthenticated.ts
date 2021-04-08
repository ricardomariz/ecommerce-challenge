import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppErrors';
import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing.');
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub } = verify(
      token,
      'c21f171fb3923a5cbd154ac72aeaf3f3'
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError('User does not exist.');
    }
  } catch {
    throw new AppError('Invalid token.');
  }

  next();
}
