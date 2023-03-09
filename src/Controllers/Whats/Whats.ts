import { create } from 'venom-bot';
import { clientesWhats } from '../../server';


  function filterArrayBySession(arr, session) {
    return arr.filter(function(item) {
      return item.session === session;
    });
  }

  export async function CreateSession(request, response) {

    const session =  request.body.session

    try {

      const cliente = await create(session)

      clientesWhats.push({
        session: session,
        cliente: cliente
      })

      return response.json("OK"); 
    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }






  // Basic Functions

  export async function sendTextCustom(request, response) {

   const session =  request.body.session
   const mensagem =  request.body.msg
   const tel = request.body.tel

   const cliente = filterArrayBySession(clientesWhats, session)

    try {



      const result = await cliente[0].cliente.sendText(tel, mensagem);

      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendListMenuCustom(request, response) {

    const session =  request.body.session
    const title =  request.body.title
    const description =  request.body.description
    const choose =  request.body.choose
    const tel = request.body.tel
 
    const cliente = filterArrayBySession(clientesWhats, session)

    const sections = [
      {
        title: "Section 1",
        rows: [
          {
            rowId: "1",
            title: "Element 1",
            description: "Description 1",
          },
          {
            rowId: "2",
            title: "Element 2",
            description: "Description 2",
          },
        ]
      },
      {
        title: "Section 2",
        rows: [
          {
            rowId: "3",
            title: "Element 3",
            description: "Description 3",
          },
          {
            rowId: "4",
            title: "Element 4",
            description: "Description 4",
          },
        ]
      },
    ];

    try {

      const result = await cliente[0].cliente.sendListMenu(tel, title, description, choose, sections)

      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }
 
  export async function sendButtonsCustom(request, response) {

    const session =  request.body.session
    const title =  request.body.title
    const description =  request.body.description
    const tel = request.body.tel
 
    const cliente = filterArrayBySession(clientesWhats, session)

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

    try {

      const result = await cliente[0].cliente.sendButtons(tel, title, buttons, description);

      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendButtonsTemplateCustom(request, response) {

    const session =  request.body.session
    const title =  request.body.title
    const description =  request.body.description
    const tel = request.body.tel
 
    const cliente = filterArrayBySession(clientesWhats, session)

    let buttons: [
      {
        url: 'https://orkestral.io/',
        text: 'Orkestral Cloud'
      },
      {
        phoneNumber: '+55 11 91438-0641',
        text: 'Suporte Orkestral'
      },
      {
        id: '1',
        text: 'Button 1'
      },
      {
        id: '2',
        text: 'Button 2'
      }
    ]

    try {

      const result = await cliente[0].cliente.sendButtonsTemplate(tel, title, buttons, description);
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendVoiceCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel
 
    const cliente = filterArrayBySession(clientesWhats, session)


    try {
      
      const result = await cliente[0].cliente.sendVoice(tel, './audio.mp3')
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendVoiceBase64Custom(request, response) {

    const session =  request.body.session
    const base64MP3 =  request.body.base64MP3
    const tel = request.body.tel
 
    const cliente = filterArrayBySession(clientesWhats, session)


    try {
      
      const result = await cliente[0].cliente.sendVoiceBase64(tel, base64MP3) 
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendContactVcardCustom(request, response) {

    const session =  request.body.session
    const name =  request.body.name
    const tel = request.body.tel
    const contactSend = request.body.contactSend
 
    const cliente = filterArrayBySession(clientesWhats, session)


    try {
      
      const result = await cliente[0].cliente.sendContactVcard(tel, contactSend, name)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendContactVcardListCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel
    const contactsSend = request.body.contactsSend
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendContactVcardList(tel, contactsSend)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendLocationCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel
    const longitude = request.body.longitude
    const latitude = request.body.latitude
    const country = request.body.country
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendLocation(tel, longitude, latitude, country)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendLinkPreviewCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel
    const link = request.body.link
    const title = request.body.title
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendLinkPreview(
        tel,
        link,
        title
      )
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendImageCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel
    const img = request.body.img
    const nameImg = request.body.nameImg
    const captionImg = request.body.captionImg
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendImage(
        tel,
        img,
        nameImg,
        captionImg
      )
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendImageFromBase64Custom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel
    const base64Image = request.body.base64Image
    const nameImg = request.body.nameImg
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendImageFromBase64(
        tel,
        base64Image,
        nameImg
      )
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendFileCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel
    const doc = request.body.doc
    const nameDoc = request.body.nameDoc
    const contentText = request.body.contentText
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendFile(
        tel,
        doc,
        nameDoc,
        contentText
      )
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendFileFromBase64Custom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel
    const base64PDF = request.body.base64PDF
    const nameDoc = request.body.nameDoc
    const contentText = request.body.contentText
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendFileFromBase64(
        tel,
        base64PDF,
        nameDoc,
        contentText
      )
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendImageAsStickerGifCustom(request, response) {

    const session =  request.body.session

    const tel = request.body.tel
    const imgGif = request.body.imgGif
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendImageAsStickerGif(
        tel,
        imgGif
      )
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function sendImageAsStickerCustom(request, response) {

    const session =  request.body.session
    
    const tel = request.body.tel
    const imgGifSticker = request.body.imgGifSticker
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.sendImageAsSticker(
        tel,
        imgGifSticker
      )
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function forwardMessagesCustom(request, response) {

    const session =  request.body.session
    
    const tel = request.body.tel
    const listChats = request.body.listChats
    
 
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.forwardMessages(
        tel,
        listChats
      )
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }






  // Retrieving Data
  export async function getAllChatsCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getAllChats()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getAllChatsNewMsgCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getAllChatsNewMsg()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getAllChatsContactsCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getAllChatsContacts()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getChatContactNewMsgCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getChatContactNewMsg()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getAllChatsGroupsCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getAllChatsGroups()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getChatGroupNewMsgCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getChatGroupNewMsg()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getAllChatsTransmissionCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getAllChatsTransmission()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getAllContactsCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getAllContacts()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getListMuteCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getListMute('all')
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getSessionTokenBrowserCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getSessionTokenBrowser()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getBlockListCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getBlockList()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getAllMessagesInChatCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getAllMessagesInChat(tel)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function loadEarlierMessagesCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.loadEarlierMessages(tel)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function loadAndGetAllMessagesInChatCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.loadAndGetAllMessagesInChat(tel)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getStatusCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getStatus(tel)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getNumberProfileCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getNumberProfile(tel)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getAllUnreadMessagesCustom(request, response) {

    const session =  request.body.session

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getAllUnreadMessages()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getProfilePicFromServerCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getProfilePicFromServer(tel)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getChatCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getChat(tel)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function checkNumberStatusCustom(request, response) {

    const session =  request.body.session
    const tel = request.body.tel

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.checkNumberStatus(tel)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }






  // Group Functions

  export async function setGroupDescriptionCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId
    const description = request.body.description

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.setGroupDescription(groupId, description)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function leaveGroupCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.leaveGroup(groupId)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getGroupMembersCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getGroupMembers(groupId)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getGroupMembersIdsCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getGroupMembersIds(groupId)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getGroupInviteLinkCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getGroupInviteLink(groupId)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function createGroupCustom(request, response) {

    const session =  request.body.session
    const groupName = request.body.groupName
    const listContacts = request.body.listContacts

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.createGroup(groupName, listContacts)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function removeParticipantCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId
    const contact = request.body.contact

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.removeParticipant(groupId, contact)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function addParticipantCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId
    const contact = request.body.contact

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.addParticipant(groupId, contact)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function promoteParticipantCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId
    const contact = request.body.contact

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.promoteParticipant(groupId, contact)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function demoteParticipantCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId
    const contact = request.body.contact

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.demoteParticipant(groupId, contact)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getGroupAdminsCustom(request, response) {

    const session =  request.body.session
    const groupId = request.body.groupId

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getGroupAdmins(groupId)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }





  // Profile Functions

  export async function setProfileStatusCustom(request, response) {

    const session =  request.body.session
    const status = request.body.status

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.setProfileStatus(status)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function setProfileNameCustom(request, response) {

    const session =  request.body.session
    const nameProfile = request.body.nameProfile

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.setProfileName(nameProfile)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function setProfilePicCustom(request, response) {

    const session =  request.body.session
    const imagProfile = request.body.imagProfile

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.setProfilePic(imagProfile)
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getHostDeviceCustom(request, response) {

    const session =  request.body.session

    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getHostDevice()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }





  // Device Functions

  export async function logoutCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.logout()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function killServiceWorkerCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.killServiceWorker()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function restartServiceCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.restartService()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getConnectionStateCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getConnectionState()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getBatteryLevelCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getBatteryLevel()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function isConnectedCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.isConnected()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }

  export async function getWAVersionCustom(request, response) {

    const session =  request.body.session
    const cliente = filterArrayBySession(clientesWhats, session)

    try {
 
      const result = await cliente[0].cliente.getWAVersion()
      return response.json(result); 

    } catch (error) {
      console.log(error)
      return response.json(error);
    }
  }



