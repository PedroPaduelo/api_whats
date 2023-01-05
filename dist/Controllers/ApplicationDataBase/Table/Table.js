"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTable = exports.UpdateTable = exports.ListTable = exports.CreateTable = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
const utilsDB_1 = require("../../utils/utilsDB");
const table = "tbl_table";
const view = "view_table";
const view_schema = "view_schema";
async function CreateTable(request, response) {
    const created_at = new Date();
    const updated_at = new Date();
    const user_owner = request.email;
    const user_created = request.email;
    const user_updated = request.email;
    const schema_id_fk = request.body.schema_id_fk;
    const table_name = request.body.table_name;
    const dados = {
        schema_id_fk,
        table_name,
        user_owner,
        user_created,
        created_at,
        user_updated,
        updated_at
    };
    try {
        const resulFidOnSchema = await connection_bd_corer_1.default.select("*").from(view_schema).where('id', schema_id_fk).first();
        if (!resulFidOnSchema)
            return false;
        const bd = await (0, utilsDB_1.connectionDataBase)(resulFidOnSchema.datname);
        if (!bd)
            return false;
        const resultCreate = await bd.schema.withSchema(resulFidOnSchema.schema_name).createTable(table_name, function (table) {
        });
        if (resultCreate.command !== "CREATE") {
            return response.json(resultCreate);
        }
        await (0, connection_bd_corer_1.default)(table).insert(dados);
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.CreateTable = CreateTable;
async function ListTable(request, response) {
    try {
        const result = await connection_bd_corer_1.default.select("*").from(view);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListTable = ListTable;
async function UpdateTable(request, response) {
    const updated_at = new Date();
    const user_updated = request.email;
    const id = request.body.id;
    const table_name_new = request.body.table_name_new;
    const dados = {
        table_name: table_name_new,
        user_updated,
        updated_at
    };
    try {
        const resulFidOnTable = await connection_bd_corer_1.default.select("*").from(view).where('id', id).first();
        const bd = await (0, utilsDB_1.connectionDataBase)(resulFidOnTable.datname);
        if (await (0, utilsDB_1.hasTable)(resulFidOnTable.schema_name, resulFidOnTable.table_name, bd)) {
            const resultCreate = await bd.schema.withSchema(resulFidOnTable.schema_name).renameTable(resulFidOnTable.table_name, table_name_new);
            await (0, connection_bd_corer_1.default)(table).where('id', id).update(dados);
            const result = await connection_bd_corer_1.default.select("*").from(table);
            return response.json(result);
        }
        else {
            return response.json(false);
        }
    }
    catch (error) {
        return response.json(error);
    }
}
exports.UpdateTable = UpdateTable;
async function DeleteTable(request, response) {
    const id = request.body.id;
    try {
        const row = await connection_bd_corer_1.default.select("*").from(view).where('id', id).first();
        if (!row) {
            return response.status(404).json({ error: 'Table not found' });
        }
        const bd = await (0, utilsDB_1.connectionDataBase)(row.datname);
        const resultDrop = await bd.schema.withSchema(row.schema_name).dropTableIfExists(row.table_name);
        if (!resultDrop) {
            return response.status(401).json({ error: 'Unauthorized to delete table' });
        }
        await (0, connection_bd_corer_1.default)("tbl_column").where('table_id_fk', row.id).del();
        await (0, connection_bd_corer_1.default)(table).where('id', id).del();
        const result = await connection_bd_corer_1.default.select("*").from(view);
        return response.json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ error: 'An unexpected error occurred' });
    }
}
exports.DeleteTable = DeleteTable;
