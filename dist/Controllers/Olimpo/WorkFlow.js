"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkFlow = void 0;
const fn_adega_1 = require("../Function_Json/fn_adega");
function mapCtxVars(obj, schema) {
    const newObj = {};
    for (const s of schema) {
        let value = s.value;
        if (s.type === "dynamic") {
            value = obj;
            const pathParts = s.path.split(".");
            for (const part of pathParts) {
                value = value[part];
            }
        }
        newObj[s.nameVar] = value;
    }
    return newObj;
}
function addProperty(obj, property, value) {
    const properties = property.split('.');
    let currentObject = obj;
    for (let i = 0; i < properties.length - 1; i++) {
        if (!currentObject.hasOwnProperty(properties[i])) {
            currentObject[properties[i]] = {};
        }
        currentObject = currentObject[properties[i]];
    }
    currentObject[properties[properties.length - 1]] = value;
}
async function WorkFlow(request, response) {
    const email = request.email;
    const body = request.body;
    const func = request.params.func;
    const fn = fn_adega_1.fn_full[func];
    if (!fn) {
        return response.json("Rota não localizada!");
    }
    let ctx = {
        user: email,
        body: body,
        vars: mapCtxVars({}, fn.fn_static_data),
        process: {},
        outputs: {}
    };
    let count = 0;
    let result = {};
    while (fn.fn_process.length > count) {
        const fn_process = fn.fn_process[count];
        console.log(fn_process);
        count++;
    }
    return response.json(ctx);
}
exports.WorkFlow = WorkFlow;
