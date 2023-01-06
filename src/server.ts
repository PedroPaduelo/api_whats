import express, { json } from 'express';
import httpServer from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes';
import { Server } from "socket.io";

import "./whatsSap";



dotenv.config();

const app = express();
const server = httpServer.createServer(app);

// Mudei a criação do servidor do Socket.io para utilizar o server criado acima
export const io = new Server(server, {
  cors: {
      origin: '*'
  }
});

app.use(cors());
app.use(json());

app.use(routes);

const port = process.env.PORT;



// Mudei a função listen para o server criado acima
server.listen(port, ()=> console.log("Conectado! PORT: " + port));
