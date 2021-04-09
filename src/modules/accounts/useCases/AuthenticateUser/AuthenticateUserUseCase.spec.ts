import { AppError } from '@errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: UsersRepositoryInMemory;
let authenticateUser: AuthenticateUserUseCase;

jest.mock('bcrypt', () => {
  return {
    compare: (a: string, b: string) => a === b,
  };
});

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUser = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate an existing user', async () => {
    const testUser = {
      name: 'John Doe',
      email: 'test@example.com',
      driver_license: '1234',
      password: 'password',
    };

    await usersRepository.create(testUser);

    const authentication = await authenticateUser.execute({
      email: testUser.email,
      password: testUser.password,
    });

    expect(authentication).toHaveProperty('token');
    expect(authentication).toHaveProperty('user');
  });

  it('should only return user name and email', async () => {
    const testUser = {
      name: 'John Doe',
      email: 'test@example.com',
      driver_license: '1234',
      password: 'password',
    };

    await usersRepository.create(testUser);

    const authentication = await authenticateUser.execute({
      email: testUser.email,
      password: testUser.password,
    });

    expect(authentication.user).toStrictEqual({
      name: testUser.name,
      email: testUser.email,
    });
    expect(authentication.user).not.toHaveProperty('password');
  });

  it('should not be able to authenticate an user with invalid email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'never_created@mail.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with invalid password', async () => {
    const testUser = {
      name: 'John Doe',
      email: 'test@example.com',
      driver_license: '1234',
      password: 'password',
    };

    await usersRepository.create(testUser);

    await expect(
      authenticateUser.execute({
        email: testUser.email,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
