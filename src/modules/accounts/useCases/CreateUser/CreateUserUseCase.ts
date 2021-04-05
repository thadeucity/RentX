import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  driver_license: string;
  name: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findSame({
      email,
      driver_license,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
