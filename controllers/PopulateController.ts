import express from 'express';
import Middlewares from '../middlewares/Middlewares';

class PopulateController extends Middlewares {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', [
      this.populateDB,
    ]);
  }

}

export default PopulateController;
