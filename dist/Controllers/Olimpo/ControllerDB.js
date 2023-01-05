"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionFullBD = exports.DeletedColumnsByTable = exports.RenameColumnsByTable = exports.CreatedColumnsByTable = exports.ListColumnsByTable = exports.DeletedTableByDbBySchema = exports.UpdateTableByDbBySchema = exports.ListTablesByDbBySchema = exports.CreatedTableByDbBySchema = exports.ListTablesByDb = exports.ListSchemaByDb = exports.CountIndexByDb = void 0;
const connection_bd_corer_1 = __importDefault(require("../../Database/connection_bd_corer"));
const utilsDB_1 = require("../utils/utilsDB");
async function CountIndexByDb(request, response) {
    const result = await (0, utilsDB_1.findSchemas)();
    return response.json(result);
}
exports.CountIndexByDb = CountIndexByDb;
async function ListSchemaByDb(request, response) {
    const result = await (0, utilsDB_1.findSchemasByDb)();
    return response.json(result);
}
exports.ListSchemaByDb = ListSchemaByDb;
async function ListTablesByDb(request, response) {
    const result = await (0, utilsDB_1.findTablesByDb)();
    return response.json(result);
}
exports.ListTablesByDb = ListTablesByDb;
async function CreatedTableByDbBySchema(request, response) {
    const schema_name = request.body.schema_name || "public";
    const table = request.body.table;
    try {
        const result = await connection_bd_corer_1.default.schema.withSchema(schema_name).createTable(table, function (table) {
            table.increments();
            table.string('stages').notNullable().defaultTo('draft');
            table.string('user_created').notNullable();
            table.timestamp('created_at').notNullable();
            table.string('user_updated').notNullable();
            table.timestamp('updated_at').notNullable();
        });
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.CreatedTableByDbBySchema = CreatedTableByDbBySchema;
async function ListTablesByDbBySchema(request, response) {
    const schema_name = request.body.schema_name || "public";
    try {
        const result = await connection_bd_corer_1.default.raw(`
      SELECT 
        table_schema,
        table_name,
        table_type,
        pg_size_pretty(pg_total_relation_size(table_schema||'.'||table_name)) AS table_full_size
      FROM information_schema.tables
      where table_schema = ?
      order by table_name
    `, schema_name);
        return response.json(result.rows.map((row, i) => {
            row.id = i + 1;
            return row;
        }));
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListTablesByDbBySchema = ListTablesByDbBySchema;
async function UpdateTableByDbBySchema(request, response) {
    const schema_name = request.body.schema_name || "public";
    const table = request.body.table;
    const new_table = request.body.new_table;
    try {
        if (await (0, utilsDB_1.hasTable)(schema_name, table, "sdf")) {
            const result = await connection_bd_corer_1.default.schema.withSchema(schema_name).renameTable(table, new_table);
            return response.json(result);
        }
        return response.json(false);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.UpdateTableByDbBySchema = UpdateTableByDbBySchema;
async function DeletedTableByDbBySchema(request, response) {
    const schema_name = request.body.schema_name || "public";
    const table = request.body.table;
    try {
        const result = await connection_bd_corer_1.default.schema.withSchema(schema_name).dropTableIfExists(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.DeletedTableByDbBySchema = DeletedTableByDbBySchema;
async function ListColumnsByTable(request, response) {
    const table = request.params.table;
    try {
        const result = await (0, utilsDB_1.findColumns)(table);
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ListColumnsByTable = ListColumnsByTable;
async function CreatedColumnsByTable(request, response) {
    const schema_name = request.body.schema_name || "public";
    const table = request.body.table;
    const column = request.body.column;
    try {
        if (await (0, utilsDB_1.hasTable)(schema_name, table, "sdf")) {
            if (await (0, utilsDB_1.hasColumn)(schema_name, table, column.column_name, "sdf")) {
                return response.json("Column already exists");
            }
            else {
                const result = await connection_bd_corer_1.default.schema.withSchema(schema_name).table(table, function (table) {
                    (0, utilsDB_1.schemaColumn)(table, column);
                });
                return response.json(result);
            }
        }
        return response.json("Table not exists");
    }
    catch (error) {
        console.log(error);
        return response.json(error);
    }
}
exports.CreatedColumnsByTable = CreatedColumnsByTable;
async function RenameColumnsByTable(request, response) {
    const schema_name = request.body.schema_name || "public";
    const table = request.body.table;
    const column_name = request.body.column_name;
    const column_new_name = request.body.column_new_name;
    try {
        if (await (0, utilsDB_1.hasTable)(schema_name, table, "sdf")) {
            if (!await (0, utilsDB_1.hasColumn)(schema_name, table, column_name, "sdf")) {
                return response.json("Column not exists");
            }
            else {
                const result = await connection_bd_corer_1.default.schema.withSchema(schema_name).table(table, function (table) {
                    table.renameColumn(column_name, column_new_name);
                });
                return response.json(result);
            }
        }
        return response.json("Table not exists");
    }
    catch (error) {
        return response.json(error);
    }
}
exports.RenameColumnsByTable = RenameColumnsByTable;
async function DeletedColumnsByTable(request, response) {
    const schema_name = request.body.schema_name || "public";
    const table = request.body.table;
    const column_name = request.body.column_name;
    try {
        if (await (0, utilsDB_1.hasTable)(schema_name, table, "sdf")) {
            if (!await (0, utilsDB_1.hasColumn)(schema_name, table, column_name, "sdf")) {
                return response.json("Column not exists");
            }
            else {
                const result = await connection_bd_corer_1.default.schema.withSchema(schema_name).table(table, function (table) {
                    table.dropColumn(column_name);
                });
                return response.json(result);
            }
        }
        return response.json("Table not exists");
    }
    catch (error) {
        return response.json(error);
    }
}
exports.DeletedColumnsByTable = DeletedColumnsByTable;
async function actionFullBD(request, response) {
    const table = request.body.table;
    const methods = request.body.methods;
    try {
        const result = await (0, utilsDB_1.fullBD)(methods, table);
        return response.json(result);
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao executar Dados_Insert"
        });
    }
}
exports.actionFullBD = actionFullBD;
