import connection from '../../Database/connection_bd_corer';
import { create, Whatsapp } from 'venom-bot';


const table = "tbl_app"
let whats = []


export async function CreateSession(request, response) {

  
    try {

      const client = await create(
        "teste"
      )

      whats.push(client)

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



