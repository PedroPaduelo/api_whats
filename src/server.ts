import express, { json } from 'express';
import httpServer from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes';
import { Server } from "socket.io";

import "./whatsSap";



function filterArrayBySession(arr, session) {
  return arr.filter(function(item) {
    return item.session === session;
  });
}

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


export let clientes = []





io.on("connection", (socket) => {
  console.log(`- Usuário ${socket.id} conectado.`);


  socket.on('mensagem', async (data) => {
    console.log(data.session)

    const auxi = filterArrayBySession(clientes, data.session)
    console.log(clientes)


    auxi[0].cliente.onMessage( async message => {
      console.log(message)
    })
  
    
  })

})



// Mudei a função listen para o server criado acima
server.listen(port, ()=> console.log("Conectado! PORT: " + port));
