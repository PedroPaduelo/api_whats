"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProcessConditions = exports.UpdateProcessConditions = exports.ListProcessConditions = exports.CreateProcessConditions = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
const table = "tbl_process_conditions";
async function CreateProcessConditions(request, response) {
    const created_at = new Date();
    const updated_at = new Date();
    const user_created = request.email;
    const user_updated = request.email;
    const dados = Object.assign(Object.assign({}, request.body), { user_created,
        created_at,
        user_updated,
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
exports.CreateProcessConditions = CreateProcessConditions;
async function ListProcessConditions(request, response) {
    try {
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListProcessConditions = ListProcessConditions;
async function UpdateProcessConditions(request, response) {
    const id = request.body.id;
    const updated_at = new Date();
    const user_updated = request.email;
    const dados = Object.assign(Object.assign({}, request.body), { user_updated,
        updated_at });
    try {
        await (0, connection_bd_corer_1.default)(table).where('id', id).update(dados);
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.UpdateProcessConditions = UpdateProcessConditions;
async function DeleteProcessConditions(request, response) {
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
exports.DeleteProcessConditions = DeleteProcessConditions;
