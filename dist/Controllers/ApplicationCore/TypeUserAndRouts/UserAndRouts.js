"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRelationTypeUserAndRouts = exports.DeleteRelationTypeUserAndRouts = exports.CreateRelationTypeUserAndRouts = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
const table = "tblr_type_user_and_routes";
async function CreateRelationTypeUserAndRouts(request, response) {
    const user_type_id = request.body.user_type_id;
    try {
        await (0, connection_bd_corer_1.default)(table).insert(request.body);
        const result = await connection_bd_corer_1.default.select("*").from(table).where('user_type_id', user_type_id);
        return response.json(result);
    }
    catch (error) {
        console.log(error);
        return response.json(error);
    }
}
exports.CreateRelationTypeUserAndRouts = CreateRelationTypeUserAndRouts;
async function DeleteRelationTypeUserAndRouts(request, response) {
    const route_id = request.body.route_id;
    const user_type_id = request.body.user_type_id;
    try {
        await (0, connection_bd_corer_1.default)(table).where('route_id', route_id).where('user_type_id', user_type_id).del();
        const result = await connection_bd_corer_1.default.select("*").from(table).where('user_type_id', user_type_id);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.DeleteRelationTypeUserAndRouts = DeleteRelationTypeUserAndRouts;
async function ListRelationTypeUserAndRouts(request, response) {
    const user_type_id = request.body.user_type_id;
    try {
        const result = await connection_bd_corer_1.default.select("*").from(table).where('user_type_id', user_type_id);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListRelationTypeUserAndRouts = ListRelationTypeUserAndRouts;
