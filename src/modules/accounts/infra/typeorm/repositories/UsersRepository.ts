import { getRepository, Repository } from 'typeorm';

import {
  ICreateUserDTO,
  IUniqueUserDTO,
} from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    is_admin,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      is_admin,
    });

    await this.repository.save(user);
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findSame({
    email,
    driver_license,
  }: IUniqueUserDTO): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: [{ email }, { driver_license }],
    });

    return user;
  }
}

export { UsersRepository };
