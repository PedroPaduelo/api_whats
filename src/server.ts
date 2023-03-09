import express, { json } from 'express';
import { Server } from 'socket.io';
import httpServer from 'http';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { create } from 'venom-bot';
import { verify } from 'jsonwebtoken';
import routes from './routes/routes';


dotenv.config();


export const clientesIo = {};

const app = express();
const server = httpServer.createServer(app);
app.use(cors());
app.use(json());
app.use(routes);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


io.use((socket, next) => {
  const token = socket.handshake.auth.token.replace(/"/g, "");
  verify(token, process.env.KEY_HASH, function (err, decoded) {
    if (err) {
      console.log(err)
      return "O token é inválido";
    }
    
    socket["email"] = decoded["email"];
    return next();
  });
});


export let clientesWhats = [];
io.on("connection", (socket) => {
  console.log(socket.id);
  const email = socket["email"];

  // Adiciona o novo socket ao objeto
  if (!clientesIo[email]) {
    clientesIo[email] = {
      sockets: [],
      data: null
    };
  }
  clientesIo[email].sockets.push(socket);

  // Envia as informações armazenadas para o novo socket
  const data = clientesIo[email].data;
  if (data) {
    socket.emit("reconnect", data);
  }

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on('generate-qr-code', async (data) => {



    
    const cliente = await create(
      data,
      (base64Qr, asciiQR, attempts, urlCode) => {

        const dataToStore = {
          qrCodeImage: base64Qr,
          attempts: attempts
        };

        // Armazena as informações da conexão
        clientesIo[email].data = dataToStore;

        // Envia as informações para todos os sockets
        clientesIo[email].sockets.forEach((s) => {
          s.emit("qr-code-image", {
            qrCodeImage: base64Qr,
            attempts: attempts
          });
        });
      },
      undefined,
      { logQR: false }
    );

    
    clientesWhats.push({
      session: data,
      cliente: cliente
    });



    cliente.onAnyMessage(async onAnyMessage => {
      console.log(onAnyMessage);
    });

    cliente.onMessage(async onMessage => {
      console.log(onMessage);
    });

    cliente.onAck(async onAck => {
      // Resto do código...
    });

    cliente.onStateChange(async state => {
      // Resto do código...
    });
    
  });


});

const port = process.env.PORT || 3011;
server.listen(port, () => console.log(`Server listening on port ${port}`));
