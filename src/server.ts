import express, { json } from 'express';
import * as dotenv from 'dotenv' 
import cors from 'cors';
import { create, Whatsapp } from 'venom-bot';

const venom = require('venom-bot');



import routes from './routes/routes';

dotenv.config()

const app = express();

app.use(cors());
app.use(json());

app.use(routes);



// Supports ES6
// import { create, Whatsapp } from 'venom-bot';



async function start(client) {

  client.onMessage((message) => {
    console.log(message)

  });
}

venom
  .create(
    'sdfa',
    undefined,
    (statusSession, session) => {
      console.log('Status Session: ', statusSession);
      //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    },
    {
      multidevice: false // for version not multidevice use false.(default: true)
    }
  )
  .then((client) => {
    console.log(client);
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });




const port = process.env.PORT 
app.listen(port, ()=> console.log("Conectado! PORT: " + port));