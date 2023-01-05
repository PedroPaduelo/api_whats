"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpisDataBase = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
async function KpisDataBase(request, response) {
    try {
        const tbl_data_base = await (0, connection_bd_corer_1.default)("tbl_data_base").count('* as total');
        const tbl_schema = await (0, connection_bd_corer_1.default)("tbl_schema").count('* as total');
        const tbl_table = await (0, connection_bd_corer_1.default)("tbl_table").count('* as total');
        const result = {
            tbl_data_base: tbl_data_base[0].total,
            tbl_schema: tbl_schema[0].total,
            tbl_table: tbl_table[0].total
        };
        return response.json(result);
    }
    catch (error) {
        return response.json(error);
    }
}
exports.KpisDataBase = KpisDataBase;
