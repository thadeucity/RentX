import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  list(): Promise<Specification[]>;
  create(data: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | undefined>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
