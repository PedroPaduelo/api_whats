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
          WorkFlow  
} from '../Controllers/Olimpo/WorkFlow';

import { 
          actionFullBD, 
          CountIndexByDb, 
} from '../Controllers/Olimpo/ControllerDB';

import {  CreateDataBase, DeleteDataBase, ListDataBase, UpdateDataBase  } from '../Controllers/ApplicationDataBase/DataBase/DataBase';

import { 
          CreateApp, 
          DeleteApp, 
          ListApp, 
          UpdateApp 
} from '../Controllers/Application/Application';

import { CreateSchema, DeleteSchema, ListSchema, UpdateSchema } from '../Controllers/ApplicationDataBase/Schema/Schema';
import { CreateTable, DeleteTable, ListTable, UpdateTable } from '../Controllers/ApplicationDataBase/Table/Table';
import { CreateColumn, DeleteColumn, ListColumn, ListColumnByTable, UpdateColumn } from '../Controllers/ApplicationDataBase/Column/Column';
import { CreateWorkFlow, DeleteWorkFlow, ListWorkFlow, UpdateWorkFlow } from '../Controllers/ApplicationWorkFlow/WorkFlow/WorkFlow';
import { CreateFunction, DeleteFunction, ListFunction, UpdateFunction } from '../Controllers/ApplicationWorkFlow/Function/Function';
import { CreateVars, DeleteVars, ListVars, UpdateVars } from '../Controllers/ApplicationWorkFlow/Vars/Vars';
import { CreateProcess, DeleteProcess, ListProcess, UpdateProcess } from '../Controllers/ApplicationWorkFlow/Process/Process';
import { CreateProcessConditions, DeleteProcessConditions, ListProcessConditions, UpdateProcessConditions } from '../Controllers/ApplicationWorkFlow/ProcessConditions/ProcessConditions';
import { KpisDataBase } from '../Controllers/ApplicationDataBase/KpisDataBase/KpisDataBase';








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



routes.post('/WorkFlow/:func', WorkFlow);












routes.post('/CreateWorkFlow', CreateWorkFlow);
routes.get('/ListWorkFlow', ListWorkFlow);
routes.put('/UpdateWorkFlow', UpdateWorkFlow);
routes.post('/DeleteWorkFlow', DeleteWorkFlow);

routes.post('/CreateFunction', CreateFunction);
routes.get('/ListFunction', ListFunction);
routes.put('/UpdateFunction', UpdateFunction);
routes.post('/DeleteFunction', DeleteFunction);

routes.post('/CreateVars', CreateVars);
routes.get('/ListVars', ListVars);
routes.put('/UpdateVars', UpdateVars);
routes.post('/DeleteVars', DeleteVars);

routes.post('/CreateProcess', CreateProcess);
routes.get('/ListProcess', ListProcess);
routes.put('/UpdateProcess', UpdateProcess);
routes.post('/DeleteProcess', DeleteProcess);

routes.post('/CreateProcessConditions', CreateProcessConditions);
routes.get('/ListProcessConditions', ListProcessConditions);
routes.put('/UpdateProcessConditions', UpdateProcessConditions);
routes.post('/DeleteProcessConditions', DeleteProcessConditions);


/// ----------------------------- APP ---------------------------------- /// 


routes.post('/CreateApp', CreateApp);
routes.get('/ListApp', ListApp);
routes.put('/UpdateApp', UpdateApp);
routes.post('/DeleteApp', DeleteApp);


/// -------------------------------------------------------------------- /// 



routes.post('/CreateDataBase', CreateDataBase );
routes.get('/ListDataBase', ListDataBase);
routes.put('/UpdateDataBase', UpdateDataBase);
routes.post('/DeleteDataBase', DeleteDataBase);


routes.post('/CreateSchema', CreateSchema );
routes.get('/ListSchema', ListSchema);
routes.put('/UpdateSchema', UpdateSchema);
routes.post('/DeleteSchema', DeleteSchema);


routes.post('/CreateTable', CreateTable);
routes.get('/ListTable', ListTable);
routes.put('/UpdateTable', UpdateTable);
routes.post('/DeleteTable', DeleteTable);


routes.post('/CreateColumn', CreateColumn);

routes.get('/ListColumn', ListColumn);
routes.get('/ListColumnByTable/:id', ListColumnByTable);

routes.put('/UpdateColumn', UpdateColumn);
routes.post('/DeleteColumn', DeleteColumn);


routes.get('/CountIndexByDb', CountIndexByDb );
routes.post('/actionFullBD', actionFullBD);

routes.get('/KpisDataBase', KpisDataBase );


// 

/// -------------------------------------------------------------------- /// 



















export default routes;
