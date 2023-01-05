"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRoute = exports.UpdateRoute = exports.ListRoute = exports.CreateRoute = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
const table = "tbl_routs";
async function CreateRoute(request, response) {
    const created_at = new Date();
    const updated_at = new Date();
    const dados = Object.assign(Object.assign({}, request.body), { created_at,
        updated_at });
    try {
        await (0, connection_bd_corer_1.default)(table).insert(dados);
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.CreateRoute = CreateRoute;
async function ListRoute(request, response) {
    try {
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListRoute = ListRoute;
async function UpdateRoute(request, response) {
    const id = request.body.id;
    const updated_at = new Date();
    const dados = Object.assign(Object.assign({}, request.body), { updated_at });
    try {
        await (0, connection_bd_corer_1.default)(table).where('id', id).update(dados);
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.UpdateRoute = UpdateRoute;
async function DeleteRoute(request, response) {
    const id = request.body.id;
    try {
        await (0, connection_bd_corer_1.default)(table).where('id', id).del();
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.DeleteRoute = DeleteRoute;
