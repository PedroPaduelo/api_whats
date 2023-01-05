"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDataBase = exports.UpdateDataBase = exports.ListDataBase = exports.CreateDataBase = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
const table = "tbl_data_base";
async function CreateDataBase(request, response) {
    const created_at = new Date();
    const updated_at = new Date();
    const user_owner = request.email;
    const user_created = request.email;
    const user_updated = request.email;
    const datname = request.body.datname;
    const datconnlimit = request.body.datconnlimit;
    const app_id_fk = request.body.app_id_fk;
    const dados = {
        app_id_fk,
        datname,
        datconnlimit: parseInt(datconnlimit),
        user_owner,
        user_created,
        created_at,
        user_updated,
        updated_at
    };
    try {
        const result = await connection_bd_corer_1.default.raw(`CREATE DATABASE ${datname}
              CONNECTION LIMIT ${datconnlimit}
      `);
        if (result.command !== "CREATE") {
            return response.json(result);
        }
        await (0, connection_bd_corer_1.default)(table).insert(dados);
        const resultList = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(resultList);
    }
    catch (error) {
        console.log(error);
        return response.json(error);
    }
}
exports.CreateDataBase = CreateDataBase;
async function ListDataBase(request, response) {
    try {
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListDataBase = ListDataBase;
async function UpdateDataBase(request, response) {
    const user_updated = request.email;
    const updated_at = new Date();
    const id = request.body.id;
    const datname = request.body.datname;
    const new_datname = request.body.new_datname;
    const dados = {
        datname: new_datname,
        user_updated,
        updated_at
    };
    try {
        const result = await connection_bd_corer_1.default.raw(`ALTER DATABASE ${datname} RENAME TO ${new_datname}`);
        if (result.command !== "ALTER") {
            return response.json(result);
        }
        else {
            await (0, connection_bd_corer_1.default)(table).where('id', id).update(dados);
            const result = await connection_bd_corer_1.default.select("*").from(table);
            return response.json(result);
        }
    }
    catch (error) {
        return response.json(error);
    }
}
exports.UpdateDataBase = UpdateDataBase;
async function DeleteDataBase(request, response) {
    const id = request.body.id;
    try {
        const resultFidDataBase = await connection_bd_corer_1.default.select("*").from("view_data_base").where('data_base_id_fk', id);
        if (resultFidDataBase.length > 0) {
            return response.json({
                name: "errorTable"
            });
        }
        const resultFidOnDataBase = await connection_bd_corer_1.default.select("*").from(table).where('id', id).first();
        if (!resultFidOnDataBase)
            return false;
        const result = await connection_bd_corer_1.default.raw(`DROP DATABASE IF EXISTS ${resultFidOnDataBase.datname} WITH (FORCE)`);
        if (result.command !== "DROP") {
            return response.json(result);
        }
        await (0, connection_bd_corer_1.default)(table).where('id', id).del();
        const resultList = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(resultList);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.DeleteDataBase = DeleteDataBase;
