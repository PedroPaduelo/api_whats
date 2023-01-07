import connection from '../../Database/connection_bd_corer';
import { create, Whatsapp } from 'venom-bot';


const table = "tbl_app"
let whats = []


  export async function CreateSession(request, response) {

  
    try {

      const result = await connection.select("*").from("tbl_ad_vendas")

      console.log(result)

      return response.json("OK"); 
    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }



  export async function getAllContactsCustom(request, response) {

    try {
      const contacts = await whats[0].getAllContacts();

      return response.json(contacts); 
    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendTextCustom(request, response) {

   const mensagem =  request.body.msg
   const tel = request.body.tel

    try {
      const result = await whats[0].sendText( tel, mensagem);

      return response.json(result); 
    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }




