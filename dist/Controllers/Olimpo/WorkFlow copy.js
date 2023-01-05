"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkFlow = void 0;
const utilsWork_1 = require("../utils/utilsWork");
const fn_adega_1 = require("../Function_Json/fn_adega");
async function WorkFlow(request, response) {
    const email = request.email;
    const body = request.body;
    const controller = request.params.controller;
    const route = request.params.route;
    const fn = fn_adega_1.fn_full[controller];
    if (!fn) {
        return response.json("Rota não localizada!");
    }
    const fnc = fn.find(element => element.fn_slug == route);
    if (!fnc) {
        return response.json("Rota não localizada!");
    }
    let ctx = {
        fn_user: email,
        fn_body_api: body,
        fn_vars: {},
        fn_result_process: {},
        fn_outputs: {}
    };
    (0, utilsWork_1.mapCtxVars)(fnc.fn_static_data, ctx);
    let count = 0;
    let result = {};
    while (fnc.fn_process.length > count) {
        const fn_process = fnc.fn_process[count];
        result = await (0, utilsWork_1.executes)(ctx, fn_process.process_slug, fn_process.process_type_action, fn_process.process, fn_process.process_is_have_condition, fn_process.process_conditions);
        ctx.fn_result_process[fn_process.process_slug] = result;
        count++;
    }
    (0, utilsWork_1.mapCtxOutput)(fnc.fn_outputs, ctx);
    return response.json(ctx.fn_outputs);
}
exports.WorkFlow = WorkFlow;
