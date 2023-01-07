import express, { json } from 'express';
import httpServer from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes';
import { Server } from "socket.io";

import "./whatsSap";
import { create } from "venom-bot";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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

io.on("connection", (socket) => {
  console.log(`- Usuário ${socket.id} conectado.`);


  socket.on('mensagem', async (data) => {
    console.log(data)

    create(
      "teste",
      (base64Qrimg, asciiQR, attempts, urlCode) => {
        console.log('Number of attempts to read the qrcode: ', attempts);
        // console.log('Terminal qrcode: ', asciiQR);
        // console.log('base64 image string qrcode: ', base64Qrimg);
        // console.log('urlCode (data-ref): ', urlCode);
      },
      undefined,
      {
        multidevice: false
      }
      ).then( async client => {
        const teste =  client.page
        console.log(teste)

      client.onMessage( async message => {
        // console.log(message)
      })
    }).catch( err => console.log(err));

    
  })

})



// Mudei a função listen para o server criado acima
server.listen(port, ()=> console.log("Conectado! PORT: " + port));
