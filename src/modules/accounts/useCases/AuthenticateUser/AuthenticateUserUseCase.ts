import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const foundUser = await this.usersRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError('Email or password incorrect!');
    }

    const isPasswordValid = await compare(password, foundUser.password);

    if (!isPasswordValid) {
      throw new AppError('Email or password incorrect!');
    }

    const token = sign({}, '4bf03438eab9adb7282ced2102ae594b', {
      subject: foundUser.id,
      expiresIn: '1d',
    });

    return {
      user: {
        email: foundUser.email,
        name: foundUser.name,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
