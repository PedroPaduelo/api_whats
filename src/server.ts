import express, { json } from 'express';
import httpServer from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes';
import { Server } from "socket.io";
import cookieParser from 'cookie-parser';
import { create } from 'venom-bot';
import knex from 'knex';



function filterArrayBySession(arr, session) {
  return arr.filter(function(item) {
    return item.session === session;
  });
}




dotenv.config();

const app = express();
const server = httpServer.createServer(app);
app.use(cors());
app.use(json());
app.use(routes);
app.use(cookieParser());

// Mudei a criação do servidor do Socket.io para utilizar o server criado acima
export const io = new Server(server, {
  cors: {
      origin: '*'
  }
});



export let listConnectionsDatabase = []
export async function connectionDataBase( datname ){

  const connectionDatabase = listConnectionsDatabase.find( (e)=> e.datname === datname )

  if(!connectionDatabase){

    try {

      const connection = knex({
        client: 'pg',
        connection: {
          host :    process.env.PGHOST,
          port:     5800,
          database: datname,
          user:     process.env.PGUSER,
          password: process.env.PGPASSWORD
        },
        pool: { 
          min: 0,
          max: 50 
        },
        useNullAsDefault: true
      })
  
      listConnectionsDatabase.push({
        datname: datname,
        connection: connection
      })

      return connection
  
    } catch (error) {
      // console.log(error);
      return false
    }

  }

  return connectionDatabase.connection
}



export let clientes = []
io.on("connection", (socket) => {
  console.log(socket.id);



  socket.on('generate-qr-code', async (data) => {
    const cliente = await create(

      data.session,
      
      (base64Qr, asciiQR, attempts, urlCode) => {
        socket.emit("qr-code-imagee", base64Qr);
      },

      undefined,

      { logQR: false }

    )

    cliente.onAnyMessage( async onAnyMessage => {
      console.log("onAnyMessage")
    })

    cliente.onMessage( async onMessage => {
      console.log("onMessage")
    })

    cliente.onStateChange( async onStateChange => {
      console.log("onStateChange")
    })

    cliente.onAck( async onAck => {
      console.log("onAck")
    })

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




const port = process.env.PORT;
// Mudei a função listen para o server criado acima
server.listen(port, ()=> console.log("Conectado! PORT: " + port));
