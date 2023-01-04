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


venom
  .create({
    session: 'session-name', //name of session
    browserArgs: [
      '--log-level=3',
      '--no-default-browser-check',
      '--disable-site-isolation-trials',
      '--no-experiments',
      '--ignore-gpu-blacklist',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-default-apps',
      '--enable-features=NetworkService',
      '--disable-setuid-sandbox',
      '--no-sandbox',
      // Extras
      '--disable-webgl',
      '--disable-threaded-animation',
      '--disable-threaded-scrolling',
      '--disable-in-process-stack-traces',
      '--disable-histogram-customizer',
      '--disable-gl-extensions',
      '--disable-composited-antialiasing',
      '--disable-canvas-aa',
      '--disable-3d-apis',
      '--disable-accelerated-2d-canvas',
      '--disable-accelerated-jpeg-decoding',
      '--disable-accelerated-mjpeg-decode',
      '--disable-app-list-dismiss-on-blur',
      '--disable-accelerated-video-decode',
  ]
  })
  .then((client) =>  start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {


  client.onMessage((message) => {
    console.log(message)

  });
}






const port = process.env.PORT 
app.listen(port, ()=> console.log("Conectado! PORT: " + port));