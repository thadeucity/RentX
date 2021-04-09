import { AppError } from '@errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepository: CategoriesRepositoryInMemory;
let createCategory: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepository);
  });

  it('Should be able to create a new Category', async () => {
    await createCategory.execute({ name: 'New Category', description: 'Test' });

    const categories = await categoriesRepository.list();

    expect(categories.length).toBe(1);
    expect(categories[0]).toHaveProperty('id');
    expect(categories[0].name).toBe('New Category');
    expect(categories[0].description).toBe('Test');
  });

  it('Shoud not be able to create two categories with the same name', async () => {
    await createCategory.execute({
      name: 'New Category',
      description: 'Original',
    });

    await expect(
      createCategory.execute({
        name: 'New Category',
        description: 'Duplicated',
      }),
    ).rejects.toBeInstanceOf(AppError);

    const categories = await categoriesRepository.list();

    expect(categories.length).toBe(1);
    expect(categories[0].description).not.toBe('Duplicated');
  });
});
