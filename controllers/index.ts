import PopulateController from './PopulateController';
import UsersController from './UsersController';
import ProductsController from './ProductsController';
import SalesController from './SalesController';
import UsersService from '../services/UsersService';
import ProductsService from '../services/ProductsService';
import SalesService from '../services/SalesService';

export default {
  populate: new PopulateController(),
  users: new UsersController(UsersService),
  products: new ProductsController(ProductsService),
  sales: new SalesController(SalesService),
};
