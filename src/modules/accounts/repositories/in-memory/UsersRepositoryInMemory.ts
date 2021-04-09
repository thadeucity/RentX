import { updateObj } from 'unch';

import {
  ICreateUserDTO,
  IUniqueUserDTO,
} from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private repository: User[];

  constructor() {
    this.repository = [];
  }

  async create({
    name,
    email,
    password,
    driver_license,
    is_admin,
  }: ICreateUserDTO): Promise<void> {
    const baseUser = new User();

    const newUser = updateObj(baseUser, {
      name,
      email,
      password,
      driver_license,
      is_admin,
    });

    await this.repository.push(newUser);
  }

  async save(user: User): Promise<void> {
    const updatedRepository = this.repository.map((repoUser) => {
      if (repoUser.id !== user.id) return repoUser;
      return user;
    });

    this.repository = updatedRepository;
  }

  async list(): Promise<User[]> {
    return this.repository;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.find(
      (repoUser) => repoUser.email === email,
    );

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.find((repoUser) => repoUser.id === id);

    return user;
  }

  async findSame({
    email,
    driver_license,
  }: IUniqueUserDTO): Promise<User | undefined> {
    const user = await this.repository.find(
      (repoUser) =>
        repoUser.driver_license === driver_license || repoUser.email === email,
    );

    return user;
  }
}

export { UsersRepositoryInMemory };
