import 'dotenv/config';
import App from './App';

const PORT = process.env.PORT || 8080;

const server = new App(Number(PORT));

server.startHttpServer();
