import express, { json } from 'express';
import * as dotenv from 'dotenv' 
import cors from 'cors';
import routes from './routes/routes';

dotenv.config()

const app = express();

app.use(cors());
app.use(json());

app.use(routes);




const port = process.env.PORT 
app.listen(port, ()=> console.log("Conectado! PORT: " + port));