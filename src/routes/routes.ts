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

import { CreateSession, getAllContactsCustom, sendTextCustom } from '../Controllers/Whats/Whats';








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
routes.post('/getAllContactsCustom', getAllContactsCustom);
routes.post('/sendTextCustom', sendTextCustom);









export default routes;
