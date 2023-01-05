"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../Middleware/auth"));
const UserCore_1 = require("../Controllers/ApplicationCore/User/UserCore");
const UserType_1 = require("../Controllers/ApplicationCore/UserType/UserType");
const Routs_1 = require("../Controllers/ApplicationCore/Routs/Routs");
const UserAndRouts_1 = require("../Controllers/ApplicationCore/TypeUserAndRouts/UserAndRouts");
const WorkFlow_1 = require("../Controllers/Olimpo/WorkFlow");
const ControllerDB_1 = require("../Controllers/Olimpo/ControllerDB");
const DataBase_1 = require("../Controllers/ApplicationDataBase/DataBase/DataBase");
const Application_1 = require("../Controllers/Application/Application");
const Schema_1 = require("../Controllers/ApplicationDataBase/Schema/Schema");
const Table_1 = require("../Controllers/ApplicationDataBase/Table/Table");
const Column_1 = require("../Controllers/ApplicationDataBase/Column/Column");
const WorkFlow_2 = require("../Controllers/ApplicationWorkFlow/WorkFlow/WorkFlow");
const Function_1 = require("../Controllers/ApplicationWorkFlow/Function/Function");
const Vars_1 = require("../Controllers/ApplicationWorkFlow/Vars/Vars");
const Process_1 = require("../Controllers/ApplicationWorkFlow/Process/Process");
const ProcessConditions_1 = require("../Controllers/ApplicationWorkFlow/ProcessConditions/ProcessConditions");
const KpisDataBase_1 = require("../Controllers/ApplicationDataBase/KpisDataBase/KpisDataBase");
const routes = express_1.default.Router();
routes.post('/CreateUserGmail', UserCore_1.CreateUserGmail);
routes.post('/CreateUserPassword', UserCore_1.CreateUserPassword);
routes.post('/LoginUserGmail', UserCore_1.LoginUserGmail);
routes.post('/LoginUserPassword', UserCore_1.LoginUserPassword);
routes.use(auth_1.default);
routes.get('/RefreshUserGmail', UserCore_1.RefreshUserGmail);
routes.get('/RefreshUserPassword', UserCore_1.RefreshUserPassword);
routes.get('/ListUser', UserCore_1.ListUser);
routes.put('/UpdateUser', UserCore_1.UpdateUser);
routes.post('/CreateRoute', Routs_1.CreateRoute);
routes.put('/UpdateRoute', Routs_1.UpdateRoute);
routes.delete('/DeleteRoute', Routs_1.DeleteRoute);
routes.get('/ListRoute', Routs_1.ListRoute);
routes.post('/CreateTypeUser', UserType_1.CreateTypeUser);
routes.put('/UpdateTypeUser', UserType_1.UpdateTypeUser);
routes.delete('/DeleteTypeUser', UserType_1.DeleteTypeUser);
routes.get('/ListRTypeUser', UserType_1.ListRTypeUser);
routes.post('/CreateRelationTypeUserAndRouts', UserAndRouts_1.CreateRelationTypeUserAndRouts);
routes.delete('/DeleteRelationTypeUserAndRouts', UserAndRouts_1.DeleteRelationTypeUserAndRouts);
routes.post('/ListRelationTypeUserAndRouts', UserAndRouts_1.ListRelationTypeUserAndRouts);
routes.post('/WorkFlow/:func', WorkFlow_1.WorkFlow);
routes.post('/CreateWorkFlow', WorkFlow_2.CreateWorkFlow);
routes.get('/ListWorkFlow', WorkFlow_2.ListWorkFlow);
routes.put('/UpdateWorkFlow', WorkFlow_2.UpdateWorkFlow);
routes.post('/DeleteWorkFlow', WorkFlow_2.DeleteWorkFlow);
routes.post('/CreateFunction', Function_1.CreateFunction);
routes.get('/ListFunction', Function_1.ListFunction);
routes.put('/UpdateFunction', Function_1.UpdateFunction);
routes.post('/DeleteFunction', Function_1.DeleteFunction);
routes.post('/CreateVars', Vars_1.CreateVars);
routes.get('/ListVars', Vars_1.ListVars);
routes.put('/UpdateVars', Vars_1.UpdateVars);
routes.post('/DeleteVars', Vars_1.DeleteVars);
routes.post('/CreateProcess', Process_1.CreateProcess);
routes.get('/ListProcess', Process_1.ListProcess);
routes.put('/UpdateProcess', Process_1.UpdateProcess);
routes.post('/DeleteProcess', Process_1.DeleteProcess);
routes.post('/CreateProcessConditions', ProcessConditions_1.CreateProcessConditions);
routes.get('/ListProcessConditions', ProcessConditions_1.ListProcessConditions);
routes.put('/UpdateProcessConditions', ProcessConditions_1.UpdateProcessConditions);
routes.post('/DeleteProcessConditions', ProcessConditions_1.DeleteProcessConditions);
routes.post('/CreateApp', Application_1.CreateApp);
routes.get('/ListApp', Application_1.ListApp);
routes.put('/UpdateApp', Application_1.UpdateApp);
routes.post('/DeleteApp', Application_1.DeleteApp);
routes.post('/CreateDataBase', DataBase_1.CreateDataBase);
routes.get('/ListDataBase', DataBase_1.ListDataBase);
routes.put('/UpdateDataBase', DataBase_1.UpdateDataBase);
routes.post('/DeleteDataBase', DataBase_1.DeleteDataBase);
routes.post('/CreateSchema', Schema_1.CreateSchema);
routes.get('/ListSchema', Schema_1.ListSchema);
routes.put('/UpdateSchema', Schema_1.UpdateSchema);
routes.post('/DeleteSchema', Schema_1.DeleteSchema);
routes.post('/CreateTable', Table_1.CreateTable);
routes.get('/ListTable', Table_1.ListTable);
routes.put('/UpdateTable', Table_1.UpdateTable);
routes.post('/DeleteTable', Table_1.DeleteTable);
routes.post('/CreateColumn', Column_1.CreateColumn);
routes.get('/ListColumn', Column_1.ListColumn);
routes.get('/ListColumnByTable/:id', Column_1.ListColumnByTable);
routes.put('/UpdateColumn', Column_1.UpdateColumn);
routes.post('/DeleteColumn', Column_1.DeleteColumn);
routes.get('/CountIndexByDb', ControllerDB_1.CountIndexByDb);
routes.post('/actionFullBD', ControllerDB_1.actionFullBD);
routes.get('/KpisDataBase', KpisDataBase_1.KpisDataBase);
exports.default = routes;
