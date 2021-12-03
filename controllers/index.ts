import PopulateController from './PopulateController';
import UsersController from './UsersController';
import ProductsController from './ProductsController';
import SalesController from './SalesController';
import UsersService from '../services/UsersService';
import ProductsService from '../services/ProductsService';
import SalesService from '../services/SalesService';
import Helpers from '../helpers/Helpers';

export default {
  populate: new PopulateController(new Helpers()),
  users: new UsersController(UsersService, new Helpers()),
  products: new ProductsController(ProductsService, new Helpers()),
  sales: new SalesController(SalesService, new Helpers()),
};
