import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io'
import http from 'http'
import path from 'path';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import errorMiddleware from '../middlewares/errorMiddleware';
import { IControllers } from '../@Types/Type';

class App {
  public app: express.Application;
  public port: number;
  public httpServer: http.Server;
  private controllers: IControllers;
  public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

  constructor(port: number, controllers: IControllers) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.controllers = controllers;
    this.port = port;
    this.io = new Server(this.httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    this.initializeMiddlewares();
    this.callSockets();
    this.callRoutes();
    this.useImages();
    this.handleErrors();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private callSockets() {
    // sockets ...
  }

  private callRoutes() {
    this.app.get('/populate', this.controllers.populate.router);
    this.app.use('/users', this.controllers.users.router);
    this.app.use('/products', this.controllers.products.router);
  }

  private useImages() {
    this.app.use('/images', express.static(path.join(__dirname, '..', 'images')));
  }

  private handleErrors() {
    this.app.use(errorMiddleware);
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`🔥 API online on port: ${this.port} 🔥`);
    });
  }

  public startHttpServer() {
    this.httpServer.listen(this.port, () => {
      console.log(`🔥 Http server online on port: ${this.port} 🔥`);
    });
  }

}

export default App;
