import express from 'express';
import validate from '../Middleware/auth';

import { 
          UpdateUser,
          CreateUserGmail, 
          LoginUserGmail,
          RefreshUserGmail,
          CreateUserPassword,
          LoginUserPassword,
          RefreshUserPassword, 
          ListUser
} from '../Controllers/ApplicationCore/User/UserCore';

import {  CreateTypeUser,
          UpdateTypeUser,
          DeleteTypeUser,
          ListRTypeUser
} from '../Controllers/ApplicationCore/UserType/UserType';

import {  ListRoute,
          CreateRoute,
          UpdateRoute,
          DeleteRoute
} from '../Controllers/ApplicationCore/Routs/Routs';

import {  CreateRelationTypeUserAndRouts,
          DeleteRelationTypeUserAndRouts,
          ListRelationTypeUserAndRouts,
} from '../Controllers/ApplicationCore/TypeUserAndRouts/UserAndRouts';

import { 
  addParticipantCustom, 
  checkNumberStatusCustom, 
  createGroupCustom, 
  CreateSession, 
  demoteParticipantCustom, 
  forwardMessagesCustom, 
  getAllChatsContactsCustom, 
  getAllChatsCustom, 
  getAllChatsGroupsCustom, 
  getAllChatsNewMsgCustom, 
  getAllChatsTransmissionCustom, 
  getAllContactsCustom, 
  getAllMessagesInChatCustom, 
  getAllUnreadMessagesCustom, 
  getBatteryLevelCustom, 
  getBlockListCustom, 
  getChatContactNewMsgCustom, 
  getChatCustom, 
  getChatGroupNewMsgCustom, 
  getConnectionStateCustom, 
  getGroupAdminsCustom, 
  getGroupInviteLinkCustom, 
  getGroupMembersCustom, 
  getGroupMembersIdsCustom, 
  getHostDeviceCustom, 
  getListMuteCustom, 
  getNumberProfileCustom, 
  getProfilePicFromServerCustom, 
  getSessionTokenBrowserCustom, 
  getStatusCustom, 
  getWAVersionCustom, 
  isConnectedCustom, 
  killServiceWorkerCustom, 
  leaveGroupCustom, 
  loadAndGetAllMessagesInChatCustom, 
  loadEarlierMessagesCustom, 
  logoutCustom, 
  promoteParticipantCustom, 
  removeParticipantCustom, 
  restartServiceCustom, 
  sendButtonsCustom, 
  sendButtonsTemplateCustom, 
  sendContactVcardCustom, 
  sendContactVcardListCustom, 
  sendFileCustom, 
  sendFileFromBase64Custom, 
  sendImageAsStickerCustom, 
  sendImageAsStickerGifCustom, 
  sendImageCustom, 
  sendImageFromBase64Custom, 
  sendLinkPreviewCustom, 
  sendListMenuCustom, 
  sendLocationCustom, 
  sendTextCustom, 
  sendVoiceBase64Custom, 
  sendVoiceCustom, 
  setGroupDescriptionCustom, 
  setProfileNameCustom, 
  setProfilePicCustom, 
  setProfileStatusCustom 
} from '../Controllers/Whats/Whats';








const routes = express.Router();
routes.post('/CreateUserGmail', CreateUserGmail);
routes.post('/CreateUserPassword', CreateUserPassword);

routes.post('/LoginUserGmail', LoginUserGmail);
routes.post('/LoginUserPassword', LoginUserPassword);

routes.use(validate);

routes.get('/RefreshUserGmail', RefreshUserGmail );
routes.get('/RefreshUserPassword', RefreshUserPassword );
routes.get('/ListUser', ListUser);
routes.put('/UpdateUser', UpdateUser);

routes.post('/CreateRoute', CreateRoute);
routes.put('/UpdateRoute', UpdateRoute);
routes.delete('/DeleteRoute', DeleteRoute);
routes.get('/ListRoute', ListRoute);

routes.post('/CreateTypeUser', CreateTypeUser);
routes.put('/UpdateTypeUser', UpdateTypeUser);
routes.delete('/DeleteTypeUser', DeleteTypeUser);
routes.get('/ListRTypeUser', ListRTypeUser);

routes.post('/CreateRelationTypeUserAndRouts', CreateRelationTypeUserAndRouts);
routes.delete('/DeleteRelationTypeUserAndRouts', DeleteRelationTypeUserAndRouts);
routes.post('/ListRelationTypeUserAndRouts', ListRelationTypeUserAndRouts);

/// -------------------------------------------------------------------- /// 


routes.post('/CreateSession', CreateSession);
routes.post('/sendTextCustom', sendTextCustom);
routes.post('/sendListMenuCustom', sendListMenuCustom);


routes.post('/sendButtonsCustom', sendButtonsCustom);
routes.post('/sendButtonsTemplateCustom', sendButtonsTemplateCustom);
routes.post('/sendVoiceCustom', sendVoiceCustom);
routes.post('/sendVoiceBase64Custom', sendVoiceBase64Custom);
routes.post('/sendContactVcardCustom', sendContactVcardCustom);
routes.post('/sendContactVcardListCustom', sendContactVcardListCustom);
routes.post('/sendLocationCustom', sendLocationCustom);
routes.post('/sendLinkPreviewCustom', sendLinkPreviewCustom);
routes.post('/sendImageCustom', sendImageCustom);
routes.post('/sendImageFromBase64Custom', sendImageFromBase64Custom);
routes.post('/sendFileCustom', sendFileCustom);
routes.post('/sendFileFromBase64Custom', sendFileFromBase64Custom);
routes.post('/sendImageAsStickerGifCustom', sendImageAsStickerGifCustom);
routes.post('/sendImageAsStickerCustom', sendImageAsStickerCustom);
routes.post('/forwardMessagesCustom', forwardMessagesCustom);


routes.post('/getAllChatsCustom', getAllChatsCustom);
routes.post('/getAllChatsNewMsgCustom', getAllChatsNewMsgCustom);
routes.post('/getAllChatsContactsCustom', getAllChatsContactsCustom);
routes.post('/getChatContactNewMsgCustom', getChatContactNewMsgCustom);
routes.post('/getAllChatsGroupsCustom', getAllChatsGroupsCustom);
routes.post('/getChatGroupNewMsgCustom', getChatGroupNewMsgCustom);
routes.post('/getAllChatsTransmissionCustom', getAllChatsTransmissionCustom);
routes.post('/getAllContactsCustom', getAllContactsCustom);
routes.post('/getListMuteCustom', getListMuteCustom);
routes.post('/getSessionTokenBrowserCustom', getSessionTokenBrowserCustom);
routes.post('/getBlockListCustom', getBlockListCustom);
routes.post('/getAllMessagesInChatCustom', getAllMessagesInChatCustom);
routes.post('/loadEarlierMessagesCustom', loadEarlierMessagesCustom);
routes.post('/loadAndGetAllMessagesInChatCustom', loadAndGetAllMessagesInChatCustom);
routes.post('/getStatusCustom', getStatusCustom);
routes.post('/getNumberProfileCustom', getNumberProfileCustom);
routes.post('/getAllUnreadMessagesCustom', getAllUnreadMessagesCustom);
routes.post('/getProfilePicFromServerCustom', getProfilePicFromServerCustom);
routes.post('/getChatCustom', getChatCustom);
routes.post('/checkNumberStatusCustom', checkNumberStatusCustom);


routes.post('/setGroupDescriptionCustom', setGroupDescriptionCustom);
routes.post('/leaveGroupCustom', leaveGroupCustom);
routes.post('/getGroupMembersCustom', getGroupMembersCustom);
routes.post('/getGroupMembersIdsCustom', getGroupMembersIdsCustom);
routes.post('/getGroupInviteLinkCustom', getGroupInviteLinkCustom);
routes.post('/createGroupCustom', createGroupCustom);
routes.post('/removeParticipantCustom', removeParticipantCustom);
routes.post('/addParticipantCustom', addParticipantCustom);
routes.post('/promoteParticipantCustom', promoteParticipantCustom);
routes.post('/demoteParticipantCustom', demoteParticipantCustom);
routes.post('/getGroupAdminsCustom', getGroupAdminsCustom);


routes.post('/setProfileStatusCustom', setProfileStatusCustom);
routes.post('/setProfileNameCustom', setProfileNameCustom);
routes.post('/setProfilePicCustom', setProfilePicCustom);
routes.post('/getHostDeviceCustom', getHostDeviceCustom);


routes.post('/logoutCustom', logoutCustom);
routes.post('/killServiceWorkerCustom', killServiceWorkerCustom);
routes.post('/restartServiceCustom', restartServiceCustom);
routes.post('/getConnectionStateCustom', getConnectionStateCustom);
routes.post('/getBatteryLevelCustom', getBatteryLevelCustom);
routes.post('/isConnectedCustom', isConnectedCustom);
routes.post('/getWAVersionCustom', getWAVersionCustom);







export default routes;
