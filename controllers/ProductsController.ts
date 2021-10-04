import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import { TProductsService } from '../@Types/Type';

class ProductsController extends Middlewares {
  public router: express.Router;
  private service: TProductsService

  constructor(service: TProductsService) {
    super();
    this.router = express.Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', [
      this.validateJWT,
      this.getAllProducts,
    ]);
  }

  private getAllProducts = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.service.getAllProducts();
    return res.status(200).json(result);
  };

}

export default ProductsController;
