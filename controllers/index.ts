import UsersController from './UsersController';
import UsersService from '../services/UsersService';

export default {
  users: new UsersController(UsersService),
};
