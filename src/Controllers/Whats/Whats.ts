import connection from '../../Database/connection_bd_corer';
import { create, Whatsapp } from 'venom-bot';


const table = "tbl_app"



export async function CreateSession(request, response) {

    const user_owner = request.email 

    try {
  
  
      
    
      const teste = await create(
          'sessionName',
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

          // start(client);
        })
        .catch((erro) => {
          console.log(erro);
        });



        console.log(teste)


      return response.json("OK"); 
    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }









// export async function CreateApp(request, response) {

//   const created_at = new Date();
//   const updated_at = new Date();
//   const user_owner = request.email 
//   const user_created = request.email 
//   const user_updated = request.email 

//   const dados = {
//     ...request.body,
//     user_owner,
//     user_created,
//     created_at,
//     user_updated,
//     updated_at
//   }

//   try {

//     await connection(table).insert(dados);
//     const result =  await connection.select("*").from(table)
//     return response.json(result); 

//   } catch (error) {
//     return response.json(error);
//   }
// }

// export async function ListApp(request, response) {
//   try {
//     const result = await connection.select("*").from(table)
//     return response.json(result); 
//   } catch (error) {
//     return response.json(error);
//   }
// }

// export async function UpdateApp(request, response) { 

//   const id = request.body.id;
//   const updated_at = new Date();


//   const dados = {
//     ...request.body,
//     updated_at
//   }

//   try {
//     await connection(table).where('id', id).update(dados);
//     const result = await connection.select("*").from(table)

//     return response.json(result); 
//   } catch (error) {
//     return response.json(error);
//   }
// }

// export async function DeleteApp(request, response) { 
  
//   const id = request.body.id;

//   try {
//     await connection(table).where('id', id).del()
//     const result = await connection.select("*").from(table)

//     return response.json(result); 
//   } catch (error) {
//     return response.json(error);
//   }
// }


