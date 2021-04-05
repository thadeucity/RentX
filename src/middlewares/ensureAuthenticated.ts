import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      '4bf03438eab9adb7282ced2102ae594b',
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const foundUser = await usersRepository.findById(userId);

    if (!foundUser) {
      throw new AppError('User does not exists', 401);
    }

    req.user = {
      id: userId,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid Token', 401);
  }
}
