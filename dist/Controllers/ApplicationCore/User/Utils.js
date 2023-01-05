"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidaGmail = exports.setUser = void 0;
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = require("bcrypt");
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
async function setUser(dados, table) {
    const user = await (0, connection_bd_corer_1.default)(table).where('email', dados.email).first();
    if (!user) {
        const result = await (0, connection_bd_corer_1.default)(table).insert(dados);
        if (result) {
            const user = await (0, connection_bd_corer_1.default)(table).where('email', dados.email).first();
            return user;
        }
        else {
            return false;
        }
    }
    else {
        return user;
    }
}
exports.setUser = setUser;
async function ValidaGmail(token, user_type_id) {
    const created_at = new Date();
    const updated_at = new Date();
    const password = await (0, bcrypt_1.hash)(token, 10);
    try {
        const res = await axios_1.default.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
        const user = res.data;
        return {
            email: user.email,
            password,
            photo_file: user.picture,
            full_name: user.name,
            fist_name: user.given_name,
            last_name: user.family_name,
            user_type_id,
            created_at,
            updated_at
        };
    }
    catch (error) {
        return {
            msg: 'Erro de token G-mail.',
            email: "",
            password: "",
            photo_file: "",
            full_name: "",
            fist_name: "",
            last_name: "",
            user_type_id: 0,
            created_at,
            updated_at
        };
    }
}
exports.ValidaGmail = ValidaGmail;
