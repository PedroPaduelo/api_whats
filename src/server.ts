import express, { json } from 'express';
import httpServer from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes';
import { Server } from "socket.io";


import "./whatsSap";
import { create } from 'venom-bot';



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
  // console.log(`- Usuário ${socket.id} conectado.`);



  socket.on('generate-qr-code', async (data) => {
    const cliente = await create(

      data.session,
      
      (base64Qr, asciiQR, attempts, urlCode) => {
        socket.emit("qr-code-imagee", base64Qr);
      },

      undefined,

      { logQR: false }

    )

    clientes.push({
      session: data.session,
      cliente: cliente
    })    
  })

  socket.on('ativar-conta', async (data) => {
    const cliente = filterArrayBySession(clientes, data.session)
    cliente[0].cliente.onMessage( async message => {
      console.log(message)
    })
  })

  


  


})



// Mudei a função listen para o server criado acima
server.listen(port, ()=> console.log("Conectado! PORT: " + port));
