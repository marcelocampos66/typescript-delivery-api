import UsersController from './UsersController';
import ProductsController from './ProductsController';
import PopulateController from './PopulateController';
import UsersService from '../services/UsersService';
import ProductsService from '../services/ProductsService';

export default {
  users: new UsersController(UsersService),
  products: new ProductsController(ProductsService),
  populate: new PopulateController(),
};
