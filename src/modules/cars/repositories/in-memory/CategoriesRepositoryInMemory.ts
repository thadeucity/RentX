import { updateObj } from 'unch/lib';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private repository: Category[];

  constructor() {
    this.repository = [];
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const baseCategory = new Category();

    const newCategory = updateObj(baseCategory, { name, description });

    await this.repository.push(newCategory);
  }

  async list(): Promise<Category[]> {
    return this.repository;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.repository.find((cat) => cat.name === name);

    return category;
  }
}

export { CategoriesRepositoryInMemory };
