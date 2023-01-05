"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTypeUser = exports.UpdateTypeUser = exports.ListRTypeUser = exports.CreateTypeUser = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
const table = "tbl_type_user";
async function CreateTypeUser(request, response) {
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
        console.log(error);
        return response.json(error);
    }
}
exports.CreateTypeUser = CreateTypeUser;
async function ListRTypeUser(request, response) {
    try {
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListRTypeUser = ListRTypeUser;
async function UpdateTypeUser(request, response) {
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
exports.UpdateTypeUser = UpdateTypeUser;
async function DeleteTypeUser(request, response) {
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
exports.DeleteTypeUser = DeleteTypeUser;
