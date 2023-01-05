"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executes = exports.IF = exports.mapActionInsert = exports.actionDbCustom = exports.actionDeleteByCol = exports.actionFindOn = exports.actionListFull = exports.actionUpData = exports.actionInsert = exports.Api = exports.mapCtxOutput = exports.binding_value_new = exports.mapCtxVars = exports.binding_value = exports.get_data_object = void 0;
const axios_1 = __importDefault(require("axios"));
const url_1 = __importDefault(require("url"));
const utilsDB_1 = require("./utilsDB");
function convertData(type_var, data) {
    switch (type_var) {
        case "numeric":
            return Number(data);
        case "string":
            return String(data);
        case "integer":
            return parseInt(data);
        default:
            return data;
    }
}
function get_data_object(obj, path) {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
    }, obj);
}
exports.get_data_object = get_data_object;
function binding_value(variable, ctx) {
    let result;
    if (variable.type === 'dynamic' || variable.type === "nextKey") {
        const value_result = get_data_object(ctx, variable.path);
        result = value_result;
        return result;
    }
    result = variable.value;
    return result;
}
exports.binding_value = binding_value;
function mapCtxVars(objData, ctx) {
    let result = {};
    objData.map(item_object => {
        result[item_object.nameVar] = binding_value(item_object, ctx);
        ctx.fn_vars = result;
    });
    return result;
}
exports.mapCtxVars = mapCtxVars;
function binding_value_new(variable, ctx) {
    let result;
    if (variable.type === 'dynamic' || variable.type === "nextKey") {
        const value_result = get_data_object(ctx, variable.path);
        result = value_result;
        return result;
    }
    result = variable.value;
    return convertData(variable.type_var, result);
}
exports.binding_value_new = binding_value_new;
function mapCtxOutput(objData, ctx, result = {}) {
    objData.map(item_object => {
        if (item_object.type === "nextKey") {
            result[item_object.nameVar] = binding_value(item_object, ctx);
            return mapCtxOutput(item_object.value, ctx, result);
        }
        result[item_object.nameVar] = binding_value(item_object, ctx);
        ctx.fn_outputs = result;
    });
    return result;
}
exports.mapCtxOutput = mapCtxOutput;
function api_params_to_obj(arrayParams) {
    let paramsObj = {};
    arrayParams.map(item => {
        paramsObj[item.key] = item.value;
    });
    const returno = new url_1.default.URLSearchParams(paramsObj);
    return paramsObj;
}
function api_headers_to_obj(api_headers) {
    let headersObj = {};
    api_headers.map(item => {
        headersObj[item.key] = item.value;
    });
    return headersObj;
}
async function Api(argumentos, ctx) {
    let api_headers = [];
    let api_parameters = [];
    argumentos.api_headers.map(item => {
        const vars = Object.keys(item);
        vars.map(var_name => {
            api_headers[var_name] = binding_value(item[var_name], ctx);
        });
    });
    argumentos.api_parameters.map(item => {
        const vars = Object.keys(item);
        vars.map(var_name => {
            api_parameters[var_name] = binding_value(item[var_name], ctx);
        });
    });
    const params = api_params_to_obj(api_parameters);
    const headers = api_headers_to_obj(api_headers);
    try {
        const result = await (0, axios_1.default)({
            method: argumentos.api_method,
            url: argumentos.api_path,
            params: params,
            headers: headers,
            auth: argumentos.auth,
        });
        return ({
            status: "success",
            data: result.data,
            message: "Sucesso ao executar API"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Erro ao executar API"
        });
    }
}
exports.Api = Api;
async function actionInsert(argumentos, ctx) {
    const created_at = new Date();
    const updated_at = new Date();
    const data = mapCtxVars(argumentos.data, ctx);
    try {
        const result = await (0, utilsDB_1.insert)(argumentos.dataBase, argumentos.table, Object.assign(Object.assign({}, data), { created_at,
            updated_at, user_created: ctx.fn_user, user_updated: ctx.fn_user }));
        return result;
    }
    catch (error) {
        return {
            error: error,
            status: "failed"
        };
    }
}
exports.actionInsert = actionInsert;
async function actionUpData(argumentos, ctx) {
    const updated_at = new Date();
    const table = argumentos.table;
    const data = mapCtxVars(argumentos.data, ctx);
    const col = argumentos.col;
    const col_value = binding_value(argumentos.col_value, ctx);
    try {
        const result = await (0, utilsDB_1.upData)(table, col, col_value, Object.assign(Object.assign({}, data), { updated_at, user_updated: ctx.fn_user }));
        return result;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
exports.actionUpData = actionUpData;
async function actionListFull(argumentos, ctx) {
    try {
        const result = await (0, utilsDB_1.indexFull)(argumentos.dataBase, argumentos.table, argumentos.cols);
        return result;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
exports.actionListFull = actionListFull;
async function actionFindOn(argumentos, ctx) {
    const table = argumentos.table;
    const col = argumentos.col;
    const col_value = binding_value(argumentos.col_value, ctx);
    const cols = argumentos.cols;
    try {
        const result = await (0, utilsDB_1.findOnByCol)(table, col, col_value, cols);
        return result;
    }
    catch (error) {
        return error;
    }
}
exports.actionFindOn = actionFindOn;
async function actionDeleteByCol(argumentos, ctx) {
    const table = argumentos.table;
    const col = argumentos.col;
    const col_value = binding_value(argumentos.col_value, ctx);
    try {
        const result = await (0, utilsDB_1.deleteByCol)(table, col, col_value);
        return result;
    }
    catch (error) {
        return error;
    }
}
exports.actionDeleteByCol = actionDeleteByCol;
async function actionDbCustom(argumentos, ctx) {
    const table = argumentos.table;
    const methods = argumentos.methods;
    try {
        const result = await (0, utilsDB_1.fullBD)(methods, table);
        return result;
    }
    catch (error) {
        return error;
    }
}
exports.actionDbCustom = actionDbCustom;
async function mapActionInsert(argumentos, ctx) {
    let list_result_map = [];
    const array_data = binding_value(argumentos.array_map, ctx);
    while (array_data.length > 0) {
        const item = array_data.shift();
        const result = await actionInsert(argumentos, Object.assign(Object.assign({}, item), { fn_user: ctx.fn_user }));
        list_result_map.push(result);
    }
    return list_result_map;
}
exports.mapActionInsert = mapActionInsert;
const functions = {
    Api,
    actionInsert,
    actionListFull,
    actionFindOn,
    actionUpData,
    actionDeleteByCol,
    actionDbCustom,
    mapActionInsert
};
function IF(process_conditions, process_is_have_condition, ctx) {
    if (!process_is_have_condition) {
        return {
            resultIfs: true
        };
    }
    const list_condition = process_conditions.map((item) => {
        let primeiro = binding_value_new(item.primeiro, ctx);
        const sinal = item.sinal;
        let segundo = binding_value_new(item.segundo, ctx);
        const results = {
            primeiro,
            sinal,
            segundo
        };
        const condition = item.sinal === "==" ? item.primeiro === item.segundo :
            item.sinal === "!==" ? item.primeiro !== item.segundo :
                item.sinal === ">" ? item.primeiro > item.segundo :
                    item.sinal === "<" ? item.primeiro < item.segundo :
                        item.sinal === ">=" ? item.primeiro >= item.segundo :
                            item.sinal === "<=" ? item.primeiro <= item.segundo :
                                false;
        return {
            results,
            condition
        };
    });
    return {
        list_condition,
        resultIfs: list_condition.every(function (item) { return item.condition === true; })
    };
}
exports.IF = IF;
async function executes(ctx, process_slug, process_type_action, processo, process_is_have_condition, process_conditions) {
    const retorno_if = IF(process_conditions, process_is_have_condition, ctx);
    if (!retorno_if.resultIfs) {
        const ctx_internal = {
            process_type_action,
            processo,
            process_is_have_condition,
            process_conditions: retorno_if,
            process_result: {
                status: "failed",
                data: {}
            }
        };
        return ctx_internal;
    }
    const result = await functions[process_type_action](processo, ctx);
    const ctx_internal = {
        process_type_action,
        processo,
        process_is_have_condition,
        process_conditions: retorno_if,
        process_result: result
    };
    return ctx_internal;
}
exports.executes = executes;
