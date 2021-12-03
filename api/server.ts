import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../ormconfig';
import App from './App';
import controllers from '../controllers';

const PORT = process.env.PORT || 8080;

(async () => {
  await createConnection(config).then(async () => {
    console.log('🐢  Connected to MySQL Database! 🐢');
  });
  const server = new App(Number(PORT), controllers);
  server.startHttpServer();
})();
