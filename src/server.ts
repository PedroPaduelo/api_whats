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