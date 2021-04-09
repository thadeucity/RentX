import { ICreateUserDTO, IUniqueUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  save(user: User): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findSame(data: IUniqueUserDTO): Promise<User | undefined>;
}

export { IUsersRepository };
