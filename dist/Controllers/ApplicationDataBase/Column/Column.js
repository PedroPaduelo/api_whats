"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteColumn = exports.UpdateColumn = exports.ListColumnByTable = exports.ListColumn = exports.CreateColumn = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
const utilsDB_1 = require("../../utils/utilsDB");
const table = "tbl_column";
const view = "view_column";
const view_table = "view_table";
async function CreateColumn(request, response) {
    const created_at = new Date();
    const updated_at = new Date();
    const user_created = request.email;
    const user_updated = request.email;
    const table_id_fk = request.body.table_id_fk;
    const column_name = request.body.column_name;
    const data_type = request.body.data_type;
    const column_default = request.body.column_default;
    const is_nullable = request.body.is_nullable;
    const dados = Object.assign(Object.assign({}, request.body), { user_created,
        created_at,
        user_updated,
        updated_at });
    try {
        const resulFidOnTable = await connection_bd_corer_1.default.select("*").from(view_table).where('id', table_id_fk).first();
        if (!resulFidOnTable)
            return false;
        const bd = await (0, utilsDB_1.connectionDataBase)(resulFidOnTable.datname);
        if (!bd)
            return false;
        if (await (0, utilsDB_1.hasTable)(resulFidOnTable.schema_name, resulFidOnTable.table_name, bd)) {
            if (await (0, utilsDB_1.hasColumn)(resulFidOnTable.schema_name, resulFidOnTable.table_name, column_name, bd)) {
                return response.json({
                    name: "error",
                    msg: "Column already exists"
                });
            }
            else {
                const resultCreate = await bd.schema.withSchema(resulFidOnTable.schema_name).table(resulFidOnTable.table_name, function (table) {
                    (0, utilsDB_1.schemaColumn)(table, {
                        column_name,
                        data_type,
                        column_default,
                        is_nullable
                    });
                });
                await (0, connection_bd_corer_1.default)(table).insert(dados);
                const result = await connection_bd_corer_1.default.select("*").from(table).where("table_id_fk", table_id_fk);
                return response.json(result);
            }
        }
        return response.json(false);
    }
    catch (error) {
        console.log(error);
        return response.json(error);
    }
}
exports.CreateColumn = CreateColumn;
async function ListColumn(request, response) {
    try {
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListColumn = ListColumn;
async function ListColumnByTable(request, response) {
    const table_id_fk = request.params.id;
    try {
        const result = await connection_bd_corer_1.default.select("*").from(table).where("table_id_fk", table_id_fk);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListColumnByTable = ListColumnByTable;
async function UpdateColumn(request, response) {
    const updated_at = new Date();
    const user_updated = request.email;
    const id = request.body.id;
    const column_name_new = request.body.column_name_new;
    const dados = {
        column_name: column_name_new,
        updated_at,
        user_updated
    };
    try {
        const resulFidOnColumn = await connection_bd_corer_1.default.select("*").from(view).where('id', id).first();
        const bd = await (0, utilsDB_1.connectionDataBase)(resulFidOnColumn.datname);
        if (await (0, utilsDB_1.hasTable)(resulFidOnColumn.schema_name, resulFidOnColumn.table_name, bd)) {
            if (!await (0, utilsDB_1.hasColumn)(resulFidOnColumn.schema_name, resulFidOnColumn.table_name, resulFidOnColumn.column_name, bd)) {
                return response.json("Column not exists");
            }
            else {
                const resultAlter = await bd.schema.withSchema(resulFidOnColumn.schema_name).table(resulFidOnColumn.table_name, function (table) {
                    table.renameColumn(resulFidOnColumn.column_name, column_name_new);
                });
                await (0, connection_bd_corer_1.default)(table).where('id', id).update(dados);
                const result = await connection_bd_corer_1.default.select("*").from(table);
                return response.json(result);
            }
        }
        return response.json(false);
    }
    catch (error) {
        console.log(error);
        return response.json(error);
    }
}
exports.UpdateColumn = UpdateColumn;
async function DeleteColumn(request, response) {
    const id = request.body.id;
    try {
        const resulFidOnColumn = await connection_bd_corer_1.default.select("*").from(view).where('id', id).first();
        const bd = await (0, utilsDB_1.connectionDataBase)(resulFidOnColumn.datname);
        if (await (0, utilsDB_1.hasTable)(resulFidOnColumn.schema_name, resulFidOnColumn.table_name, bd)) {
            if (!await (0, utilsDB_1.hasColumn)(resulFidOnColumn.schema_name, resulFidOnColumn.table_name, resulFidOnColumn.column_name, bd)) {
                return response.json("Column not exists");
            }
            else {
                const resultDrop = await bd.schema.withSchema(resulFidOnColumn.schema_name).table(resulFidOnColumn.table_name, function (table) {
                    table.dropColumn(resulFidOnColumn.column_name);
                });
                await (0, connection_bd_corer_1.default)(table).where('id', id).del();
                const result = await connection_bd_corer_1.default.select("*").from(table).where("table_id_fk", resulFidOnColumn.table_id_fk);
                return response.json(result);
            }
        }
        return response.json(false);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.DeleteColumn = DeleteColumn;
