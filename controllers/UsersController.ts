import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import Helpers from '../helpers/Helpers';
import { TUsersService } from '../@Types/Type';

class UsersController extends Middlewares {
  public router: express.Router;
  private service: TUsersService;

  constructor(service: TUsersService, helpers: Helpers) {
    super(helpers);
    this.router = express.Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', [
      this.verifyUserInfos,
      this.verifyUserExists,
      this.registerUser,
    ]);
    this.router.post('/login', [
      this.verifyLoginCredentials,
      this.login,
    ]);
    this.router.get('/', [
      this.validateJWT,
      this.getAllUsers,
    ]);
    this.router.get('/sellers', [
      this.validateJWT,
      this.getAllSellers,
    ]);
    this.router.delete('/:id', [
      this.validateJWT,
      this.verifyRoleIsAdmin,
      this.deleteUser,
    ]);
  }

  private registerUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body: { name, email, password, role } } = req;
    const result = await this.service.registerUser(
      { name, email, password, role },
    );
    return res.status(201).json(result);
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { body: { email, password } } = req;
    const result = await this.service.login({ email, password });
    if (!result) {
      return next({ status: 400, message: 'Invalid email or password' });
    }
    return res.status(200).json(result);
  };

  private getAllUsers = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.service.getAllUsers();
    return res.status(200).json(result);
  };

  private getAllSellers = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.service.getAllSellers();
    return res.status(200).json(result);
  };

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.deleteUser(Number(id));
    if (!result) {
      return next({ status: 404, message: 'This user does not exist' });
    }
    return res.status(200).json(result);
  };

}

export default UsersController;
