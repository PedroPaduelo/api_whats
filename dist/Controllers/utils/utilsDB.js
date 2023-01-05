"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List_Full_raw = exports.List_Full_By_User_Creating = exports.List_Full = exports.Get_By_Id = exports.List_Full_By_Col_on = exports.List_Full_By_Col = exports.fullBD_T = exports.fullBD = exports.deleteByCol = exports.findOnByCol = exports.indexFull = exports.upData = exports.insert = exports.findColumns = exports.findTablesByDb = exports.findSchemasByDb = exports.findSchemas = exports.schemaColumn = exports.hasColumn = exports.hasTable = exports.connectionDataBase = void 0;
const connection_bd_corer_1 = __importDefault(require("../../Database/connection_bd_corer"));
const knex_1 = __importDefault(require("knex"));
let listConnectionsDatabase = [];
async function connectionDataBase(datname) {
    const connectionDatabase = listConnectionsDatabase.find((e) => e.datname === datname);
    if (!connectionDatabase) {
        const connection = (0, knex_1.default)({
            client: 'pg',
            connection: {
                host: process.env.PGHOST,
                port: 5800,
                database: datname,
                user: process.env.PGUSER,
                password: process.env.PGPASSWORD
            },
            pool: {
                min: 0,
                max: 50
            },
            useNullAsDefault: true
        });
        listConnectionsDatabase.push({
            datname: datname,
            connection: connection
        });
        return connection;
    }
    return connectionDatabase.connection;
}
exports.connectionDataBase = connectionDataBase;
async function hasTable(schema_name, table_name, db) {
    return await db.schema.withSchema(schema_name).hasTable(table_name).then(function (exists) {
        if (exists) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.hasTable = hasTable;
async function hasColumn(schema_name, table_name, column_name, db) {
    return await db.schema.withSchema(schema_name).hasColumn(table_name, column_name).then(function (exists) {
        if (exists) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.hasColumn = hasColumn;
function schemaColumn(table, column) {
    switch (column.data_type) {
        case 'string':
            table.string(column.column_name).defaultTo(column.column_default);
            break;
        case 'varchar':
            table.string(column.column_name);
            break;
        case 'integer':
            table.integer(column.column_name);
            break;
        case 'float':
            table.float(column.column_name, column.column_precision, column.column_scale);
            break;
        case 'boolean':
            table.boolean(column.column_name);
            break;
        case 'date':
            table.date(column.column_name);
            break;
        case 'timestamp':
            table.timestamp(column.column_name);
            break;
        case 'time':
            table.time(column.column_name);
            break;
        case 'text':
            table.text(column.column_name);
            break;
        case 'binary':
            table.binary(column.column_name);
            break;
        case 'json':
            table.json(column.column_name);
            break;
        case 'jsonb':
            table.jsonb(column.column_name);
            break;
        case 'uuid':
            table.uuid(column.column_name);
            break;
        default:
            table.string(column.column_name);
            break;
    }
    return "ok";
}
exports.schemaColumn = schemaColumn;
async function findSchemas() {
    const result = await connection_bd_corer_1.default.raw(` select 
        *
      from (SELECT 
        1 as id,
        'BASE TABLE' as type,
        pg_size_pretty(sum(pg_total_relation_size(table_schema||'.'||table_name))) AS table_full_size,
        count(*) as qtd
      FROM information_schema.tables WHERE table_type = 'BASE TABLE'
      
      union
      
      SELECT 
        2 as id,
        'VIEW' as type,
        pg_size_pretty(sum(pg_total_relation_size(table_schema||'.'||table_name))) AS table_full_size,
        count(*) as qtd
      FROM information_schema.tables WHERE  table_type = 'VIEW'
      
      union
      
      SELECT 
        3 as id,
        'TOTAL' as type,
        pg_size_pretty(sum(pg_total_relation_size(table_schema||'.'||table_name))) AS table_full_size,
        count(*) as qtd
      FROM information_schema.tables) as temp_index
      order by 1 
    `);
    return result.rows;
}
exports.findSchemas = findSchemas;
async function findSchemasByDb() {
    try {
        const result = await connection_bd_corer_1.default.raw(`
      SELECT 
        table_schema,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = a.table_schema and table_type = 'BASE TABLE') as qtd_tables,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = a.table_schema and table_type = 'VIEW') as qtd_views,
        pg_size_pretty(sum(pg_total_relation_size(table_schema||'.'||table_name))) AS table_full_size
      FROM information_schema.tables a
        left join pg_catalog.pg_namespace on table_schema = nspname
        where table_schema not in ('pg_catalog', '_timescaledb_catalog', '_timescaledb_internal', 'timescaledb_information', 'information_schema', '_timescaledb_cache', '_timescaledb_config')
      group by 1,2;
    `);
        return result.rows;
    }
    catch (error) {
        return error;
    }
}
exports.findSchemasByDb = findSchemasByDb;
async function findTablesByDb() {
    try {
        const result = await connection_bd_corer_1.default.raw(`
      SELECT 
        table_schema,
        table_name,
        table_type,
        pg_size_pretty(pg_total_relation_size(table_schema||'.'||table_name)) AS table_full_size
      FROM information_schema.tables
      where table_schema <> 'information_schema' and table_schema <> 'pg_catalog'
      order by table_type, table_schema, table_name
    `);
        return result.rows;
    }
    catch (error) {
        return error;
    }
}
exports.findTablesByDb = findTablesByDb;
async function findColumns(table_name) {
    const result = await connection_bd_corer_1.default.raw(`select 
      table_catalog,
      table_schema,
      table_name,
      column_name,
      ordinal_position,
      column_default,
      is_nullable,
      data_type,
      character_maximum_length
    from information_schema.columns 
    where table_name = '${table_name}' and table_schema <> 'information_schema' and table_schema <> 'pg_catalog'
    order by ordinal_position;
    `);
    return result.rows;
}
exports.findColumns = findColumns;
async function insert(datname, table, dados) {
    const bd = await connectionDataBase(datname);
    if (!bd)
        return false;
    try {
        const [id] = await bd(table).insert(dados, ['id']);
        const result = Object.assign(Object.assign({}, id), dados);
        return {
            result,
            status: "success"
        };
    }
    catch (error) {
        console.log(error);
        return {
            error: error,
            status: "failed"
        };
    }
}
exports.insert = insert;
async function upData(table, col, col_value, dados) {
    try {
        const result = await (0, connection_bd_corer_1.default)(table).where(col, col_value).update(dados);
        return {
            result,
            status: "success"
        };
    }
    catch (error) {
        return {
            error: error,
            status: "failed"
        };
    }
}
exports.upData = upData;
async function indexFull(datname, table, cols) {
    const bd = await connectionDataBase(datname);
    if (!bd)
        return false;
    try {
        const result = await bd.select(cols).from(table);
        return {
            result,
            status: "success"
        };
    }
    catch (error) {
        return {
            error: error,
            status: "failed"
        };
    }
}
exports.indexFull = indexFull;
async function findOnByCol(table, col, col_value, cols) {
    try {
        const result = await connection_bd_corer_1.default.select(cols).from(table).where(col, col_value).first();
        return {
            result,
            status: "success"
        };
    }
    catch (error) {
        return {
            error: error,
            status: "failed"
        };
    }
}
exports.findOnByCol = findOnByCol;
async function deleteByCol(table, col, col_value) {
    try {
        const result = await (0, connection_bd_corer_1.default)(table).where(col, col_value).del();
        return {
            result,
            status: "success"
        };
    }
    catch (error) {
        return {
            error: error,
            status: "failed"
        };
    }
}
exports.deleteByCol = deleteByCol;
async function fullBD(methods, table) {
    try {
        let result = (0, connection_bd_corer_1.default)(table);
        methods.forEach((method) => {
            switch (method.method) {
                case "insert":
                    result = result[method.method](method.argumentos);
                    break;
                case "del":
                    result = result[method.method]();
                    break;
                case "selectRaw":
                    result = result['select'](connection_bd_corer_1.default.raw(method.argumentos[0]));
                    break;
                default:
                    result = result[method.method](...method.argumentos);
                    break;
            }
        });
        const teste = Promise.resolve(result).then((values) => {
            return values;
        });
        return teste;
    }
    catch (error) {
        return {
            error: error,
            status: "failed"
        };
    }
}
exports.fullBD = fullBD;
async function fullBD_T(methods, table) {
    try {
        let result;
        return result;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
exports.fullBD_T = fullBD_T;
async function List_Full_By_Col(table, col, col_value) {
    try {
        const result = await connection_bd_corer_1.default.select("*")
            .from(table)
            .where(col, col_value)
            .orderBy(col);
        return ({
            status: "success",
            result: result,
            message: "success ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_By_Col = List_Full_By_Col;
async function List_Full_By_Col_on(table, col, col_value) {
    try {
        const result = await connection_bd_corer_1.default.select("*")
            .from(table)
            .where(col, col_value)
            .orderBy(col);
        return ({
            status: "success",
            result: result[0],
            message: "success ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_By_Col_on = List_Full_By_Col_on;
async function Get_By_Id(table, id) {
    try {
        const result = await (0, connection_bd_corer_1.default)(table).where('id', id).first();
        if (result) {
            return ({
                status: "success",
                result: result,
                message: "Informação localizada!!!"
            });
        }
        else {
            return ({
                status: "failed",
                result: {},
                message: "Informação não localizado!!!"
            });
        }
    }
    catch (error) {
        return ({
            status: "failed",
            result: error,
            message: "Erro ao localizar informação"
        });
    }
}
exports.Get_By_Id = Get_By_Id;
async function List_Full(table) {
    try {
        const result = await connection_bd_corer_1.default.select("*").from(table);
        return ({
            status: "success",
            result: result,
            message: "success ao listar!!!"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full = List_Full;
async function List_Full_By_User_Creating(table, user_created) {
    try {
        const result = await connection_bd_corer_1.default.select("*")
            .from(table)
            .where('user_created', user_created)
            .orderBy('id');
        return ({
            status: "success",
            result: result,
            message: "success ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_By_User_Creating = List_Full_By_User_Creating;
async function List_Full_raw(table) {
    try {
        const result = await connection_bd_corer_1.default.raw(`select * from ${table}`);
        return ({
            status: "success",
            result: result,
            message: "success ao listar!!!"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_raw = List_Full_raw;
