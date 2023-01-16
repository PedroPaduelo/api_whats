import { create } from 'venom-bot';
import { clientes } from '../../server';



  const status = (statusSession: string, session: string) => {
    console.log(session)
  };

  const qrcode = (base64Qrimg, asciiQR, attempts, urlCode) => {
    console.log(asciiQR)
  };

  function filterArrayBySession(arr, session) {
    return arr.filter(function(item) {
      return item.session === session;
    });
  }





  export async function CreateSession(request, response) {

    const session =  request.body.session

    try {

      const cliente = await create(session)

      clientes.push({
        session: session,
        cliente: cliente
      })

      return response.json("OK"); 
    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getAllContactsCustom(request, response) {
   const session =  request.body.session

    const auxi = filterArrayBySession(clientes, session)
    try {
      const contacts = await auxi[0].cliente.getAllContacts();

      return response.json(contacts); 
    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendTextCustom(request, response) {

   const session =  request.body.session
   const mensagem =  request.body.msg
   const tel = request.body.tel

   const auxi = filterArrayBySession(clientes, session)

    try {
      

      // console.log(auxi[0].cliente)

      const result = await auxi[0].cliente.sendText(tel, mensagem);

      return response.json(result); 
    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }



