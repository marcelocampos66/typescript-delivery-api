import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import { ISaleInfos, TSalesService } from '../@Types/Type';

class SalesController extends Middlewares {
  public router: express.Router;
  private service: TSalesService;

  constructor(service: TSalesService) {
    super();
    this.router = express.Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', [
      this.validateJWT,
      this.registerSale,
    ]);
    this.router.get('/', [
      this.validateJWT,
      this.getAllSalesFromUser,
    ]);
    this.router.get('/:id', [
      this.validateJWT,
      this.getSale,
    ]);
  }

  private registerSale = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body } = req;
    const { orderData, listItens } = body as ISaleInfos;
    const result = await this.service.registerSale({ orderData, listItens });
    return res.status(201).json(result);
  };

  private getAllSalesFromUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { payload: { id } } = req;
    const result = await this.service.getAllSalesFromUser(id);
    return res.status(201).json(result);
  };

  private getSale = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.getSale(Number(id));
    if (!result) {
      return next({ status: 404, message: 'No sale found' });
    }
    return res.status(200).json(result);
  };

}

export default SalesController;
