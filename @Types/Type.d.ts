import PopulateController from '../controllers/PopulateController';
import UsersController from '../controllers/UsersController';
import ProductsController from '../controllers/ProductsController';
import SalesController from '../controllers/SalesController';
import { UsersService } from '../services/UsersService';
import { ProductsService } from '../services/ProductsService';
import { SalesService } from '../services/SalesService';

interface IControllers {
  users: UsersController;
  products: ProductsController;
  populate: PopulateController;
  sales: SalesController;
}

type TUsersService = UsersService;

type TProductsService = ProductsService;

type TSalesService = SalesService;

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

interface IOrderData {
  address: string;
  addressNumber: number;
  sellerId: number;
  totalCart: number;
  userId: number;
}

interface ISaleInfos {
  orderData: IOrderData;
  listItens: Array<ICartItem>;
}

interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface IUserWithoutPass {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface IFormatedSale {
  products: Array<ICartItem>;
  id: number;
  user: IUserWithoutPass;
  seller: IUserWithoutPass;
  total_price: number;
  delivery_address: string;
  delivery_number: number;
  sale_date: string;
  status: string;
}
