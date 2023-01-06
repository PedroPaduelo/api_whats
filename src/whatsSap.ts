import { create } from "venom-bot";
// import database from "~/database";
import { io } from "./server";






io.on("connection", (socket) => {
    console.log(`- Usuário ${socket.id} conectado.`);
    socket.on('mensagem', async (data) => {
      create("teste").then( async client => {

   
  
        client.onMessage( async message => {
          if ( !message.isGroupMsg ) {
            client.sendText(message.from, "Olá eu sou a Bot mais top de todas, sua atendente virtual.\nSeja bem vindo(a) a central de atendimento da *Infonet Telecom!*");
            client.sendText(message.from, "Selecione uma das opções:\n\n*1* - Suporte Técnico\n*2* - Financeiro\n*3* - Comercial.\n*0* - Encerrar Atendimento.");
            try {
                
              client.sendText(message.from, "Selecione uma das opções:\n\n*1* - Suporte Técnico\n*2* - Financeiro\n*3* - Comercial.\n*0* - Encerrar Atendimento.");
      
            } catch (error) {
              console.log(error);
              client.sendText(message.from, "❌ Desculpe, mas não conseguimos processar seu pedido.\nO técnico responsável pela manutenção do auto-atendimento foi avisado e em breve o auto-atendimento voltará a funcionar.");
            }
          }
        })
      
      
      
      }).catch( err => console.log(err));
    })

});






