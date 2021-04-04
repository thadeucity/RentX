import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController';
import importCategoryController from '../modules/cars/useCases/ImportCategories';
import listCategoryController from '../modules/cars/useCases/ListCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (req, res) => {
  console.log('working Funcionando Dessa vez?');
  listCategoryController().handle(req, res);
});

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  importCategoryController().handle(req, res);
});

export { categoriesRoutes };
