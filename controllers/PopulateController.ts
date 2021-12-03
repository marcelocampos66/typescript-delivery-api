import express from 'express';
import Middlewares from '../middlewares/Middlewares';
import Helpers from '../helpers/Helpers';

class PopulateController extends Middlewares {
  public router: express.Router;

  constructor(helpers: Helpers) {
    super(helpers);
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
