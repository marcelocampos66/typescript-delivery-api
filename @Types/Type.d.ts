import UsersController from '../controllers/UsersController';
import ProductsController from '../controllers/ProductsController';
import PopulateController from '../controllers/PopulateController';
import { UsersService } from '../services/UsersService';
import { ProductsService } from '../services/ProductsService';

interface IControllers {
  users: UsersController;
  products: ProductsController;
  populate: PopulateController;
}

type TUsersService = UsersService;

type TProductsService = ProductsService;

interface ITokenPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface ICredentials {
  email: string;
  password: string;
}
