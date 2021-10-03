import UsersController from '../controllers/UsersController';
import { UsersService } from '../services/UsersService';

interface IControllers {
  users: UsersController;
}

type TUsersService = UsersService;

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
