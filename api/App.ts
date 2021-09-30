import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io'
import http from 'http'
import path from 'path';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

class App {
  public app: express.Application;
  public port: number;
  public httpServer: http.Server;
  public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
  
  constructor(port: number) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
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
    // routes...
  }

  private handleErrors() {
    // this.app.use();
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`API online on port: ${this.port}`);
    });
  }

  public startHttpServer() {
    this.httpServer.listen(this.port, () => {
      console.log(`Http server online on port: ${this.port}`);
    });
  }

}

export default App;
