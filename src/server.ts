import express, { json } from 'express';
import httpServer from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes';
import { Server } from "socket.io";

import "./whatsSap";
import { create } from "venom-bot";
import connection from './Database/connection_bd_corer';


dotenv.config();

const app = express();
const server = httpServer.createServer(app);

// Mudei a criação do servidor do Socket.io para utilizar o server criado acima
export const io = new Server(server, {
  cors: {
      origin: '*'
  }
});

function wordExists(array, word) {
  return array.includes(word.toLowerCase());
}


app.use(cors());
app.use(json());

app.use(routes);

const port = process.env.PORT;

io.on("connection", (socket) => {
  console.log(`- Usuário ${socket.id} conectado.`);


  socket.on('mensagem', async (data) => {



    create("teste").then( async client => {
      console.log(client)
      client.onMessage( async message => {
        console.log(message)
      })
    }).catch( err => console.log(err));




    

  })

})



// Mudei a função listen para o server criado acima
server.listen(port, ()=> console.log("Conectado! PORT: " + port));
