import express, { json } from 'express';
import * as dotenv from 'dotenv' 
import cors from 'cors';
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
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    console.log(message)
   
    let buttons = [
      {
        "buttonId": "1",
        "buttonText": {
          "displayText": "Button 1"
          }
        },
      {
        "buttonId": "2",
        "buttonText": {
          "displayText": "Button 2"
          }
        }
      ]
    client.sendButtons(message.from, "Title", buttons, "Description")
     .then((result) => {
       console.log('Result: ', result); //return object success
     })
     .catch((erro) => {
       console.error('Error when sending: ', erro); //return object error
     });

    // client
    //   .sendText(message.from, 'Benvindo ao nosso chat Boot!')
    //   .then((result) => {
    //     console.log('Result: ', result); //return object success
    //   })
    //   .catch((erro) => {
    //     console.error('Error when sending: ', erro); //return object error
    //   });

    // client
    //   .sendText(message.from, 'Tudo bem!')
    //   .then((result) => {
    //     console.log('Result: ', result); //return object success
    //   })
    //   .catch((erro) => {
    //     console.error('Error when sending: ', erro); //return object error
    //   });

    // client
    //   .sendText(message.from, 'Em que podemos te ajudar!')
    //   .then((result) => {
    //     console.log('Result: ', result); //return object success
    //   })
    //   .catch((erro) => {
    //     console.error('Error when sending: ', erro); //return object error
    //   });

    // if (message.body === 'oi' && message.isGroupMsg === false) {
    //   client
    //     .sendText(message.from, 'Benvindo ao nosso chat Boot!')
    //     .then((result) => {
    //       console.log('Result: ', result); //return object success
    //     })
    //     .catch((erro) => {
    //       console.error('Error when sending: ', erro); //return object error
    //     });

    //   client
    //     .sendText(message.from, 'Tudo bem!')
    //     .then((result) => {
    //       console.log('Result: ', result); //return object success
    //     })
    //     .catch((erro) => {
    //       console.error('Error when sending: ', erro); //return object error
    //     });

    //   client
    //     .sendText(message.from, 'Em que podemos te ajudar!')
    //     .then((result) => {
    //       console.log('Result: ', result); //return object success
    //     })
    //     .catch((erro) => {
    //       console.error('Error when sending: ', erro); //return object error
    //     });
    // }

  });
}






const port = process.env.PORT 
app.listen(port, ()=> console.log("Conectado! PORT: " + port));