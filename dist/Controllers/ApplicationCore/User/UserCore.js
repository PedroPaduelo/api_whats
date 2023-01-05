"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = exports.ListUser = exports.RefreshUserPassword = exports.LoginUserPassword = exports.CreateUserPassword = exports.RefreshUserGmail = exports.LoginUserGmail = exports.CreateUserGmail = void 0;
const connection_bd_corer_1 = __importDefault(require("../../../Database/connection_bd_corer"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const Utils_1 = require("./Utils");
const table = "tbl_user";
const key_hash = process.env.KEY_HASH || "olympo_code_123_098_567_1234560987";
async function CreateUserGmail(request, response) {
    const id_token = request.body.id_token;
    const user_type_id = request.body.user_type_id;
    const user = await (0, Utils_1.ValidaGmail)(id_token, user_type_id);
    if (user.msg) {
        return response.json(user.msg);
    }
    const user_set = await (0, Utils_1.setUser)(user, "tbl_user");
    return response.json(user_set);
}
exports.CreateUserGmail = CreateUserGmail;
async function LoginUserGmail(request, response) {
    const id_token = request.body.id_token;
    const userGmail = await (0, Utils_1.ValidaGmail)(id_token);
    if (userGmail.msg) {
        return response.json(false);
    }
    const user = await (0, connection_bd_corer_1.default)(table).where('email', userGmail.email).first();
    if (!user) {
        return response.json(false);
    }
    const result = await (0, connection_bd_corer_1.default)('tbl_user').where('email', userGmail.email).update(userGmail);
    if (!result) {
        return response.json(false);
    }
    const token = (0, jsonwebtoken_1.sign)({ email: user.email, tokenGmail: id_token }, key_hash, { expiresIn: 8640000000000 });
    if (!token) {
        return response.json(false);
    }
    user.token = token;
    delete user.password;
    const acessos = await connection_bd_corer_1.default.select('tbl_routs.*')
        .from('tblr_type_user_and_routes')
        .leftJoin('tbl_routs', 'tbl_routs.id', 'tblr_type_user_and_routes.route_id')
        .where('user_type_id', user.user_type_id);
    const user_final = Object.assign(Object.assign({}, user), { accesses: acessos });
    return response.json(user_final);
}
exports.LoginUserGmail = LoginUserGmail;
async function RefreshUserGmail(request, response) {
    const userGmail = await (0, Utils_1.ValidaGmail)(request.tokenGmail);
    if (userGmail.msg) {
        return response.json(false);
    }
    const user = await (0, connection_bd_corer_1.default)(table).where('email', request.email).first();
    if (!user) {
        return response.json(false);
    }
    const token = (0, jsonwebtoken_1.sign)({ email: user.email, tokenGmail: request.tokenGmail }, key_hash, { expiresIn: 8640000000000 });
    if (!token) {
        return response.json(false);
    }
    user.token = token;
    const acessos = await connection_bd_corer_1.default.select('tbl_routs.*')
        .from('tblr_type_user_and_routes')
        .leftJoin('tbl_routs', 'tbl_routs.id', 'tblr_type_user_and_routes.route_id')
        .where('user_type_id', user.user_type_id);
    user.acessos = acessos;
    delete user.password;
    return response.json(user);
}
exports.RefreshUserGmail = RefreshUserGmail;
async function CreateUserPassword(request, response) {
    const created_at = new Date();
    const updated_at = new Date();
    const email = request.body.email.toLowerCase();
    const password = await (0, bcrypt_1.hash)(request.body.password, 10);
    const full_name = request.body.full_name;
    const fist_name = request.body.fist_name;
    const last_name = request.body.last_name;
    const user_type_id = request.body.user_type_id;
    const photo_file = request.body.photo_file;
    const dados = {
        email,
        password,
        photo_file,
        full_name,
        fist_name,
        last_name,
        user_type_id,
        created_at,
        updated_at
    };
    const user_set = await (0, Utils_1.setUser)(dados, "tbl_user");
    return response.json(user_set);
}
exports.CreateUserPassword = CreateUserPassword;
async function LoginUserPassword(request, response) {
    const password = request.body.password;
    const email = request.body.email;
    const user = await (0, connection_bd_corer_1.default)(table).where('email', email).first();
    if (!user) {
        return response.json(user);
    }
    if (!await (0, bcrypt_1.compare)(password, user.password)) {
        return response.json({
            data: 0,
            message: "Erro ao logar usuário, procure o administrador do sistema!!!"
        });
    }
    else {
        const token = (0, jsonwebtoken_1.sign)({ email: user.email }, key_hash, { expiresIn: 8640000000000 });
        if (!token) {
            return response.json(false);
        }
        const acessos = await connection_bd_corer_1.default.select('tbl_routs.*')
            .from('tblr_type_user_and_routes')
            .leftJoin('tbl_routs', 'tbl_routs.id', 'tblr_type_user_and_routes.route_id')
            .where('user_type_id', user.user_type_id);
        user.acessos = acessos;
        user.token = token;
        if (user.fisrt_access === 1) {
            user.message = `Olá ${user.full_name} seja bem vindo!`;
        }
        else {
            user.message = `Olá ${user.full_name} seja bem vindo de volta!`;
        }
        return response.json(user);
    }
}
exports.LoginUserPassword = LoginUserPassword;
async function RefreshUserPassword(request, response) {
    const user = await (0, connection_bd_corer_1.default)(table).where('email', request.email).first();
    if (user) {
        const acessos = await connection_bd_corer_1.default.select('tbl_routs.*')
            .from('tblr_type_user_and_routes')
            .leftJoin('tbl_routs', 'tbl_routs.id', 'tblr_type_user_and_routes.route_id')
            .where('user_type_id', user.user_type_id);
        user.acessos = acessos;
        delete user.password;
        return response.json(user);
    }
    return response.json(false);
}
exports.RefreshUserPassword = RefreshUserPassword;
async function ListUser(request, response) {
    const users = await connection_bd_corer_1.default.select().from(table);
    return response.json(users);
}
exports.ListUser = ListUser;
async function UpdateUser(request, response) {
    const email = request.body.email.toLowerCase();
    const fist_name = request.body.fist_name;
    const last_name = request.body.last_name;
    const photo_file = request.body.photo_file;
    const biography = request.body.biography;
    const updated_at = new Date();
    const dados = {
        email,
        fist_name,
        last_name,
        photo_file,
        biography,
        updated_at
    };
    const user = await (0, connection_bd_corer_1.default)(table).where('email', email).first();
    if (user) {
        const result = await (0, connection_bd_corer_1.default)('tbl_user').where('email', email).update(dados);
        if (result) {
            return response.json({
                result: result,
                message: "Usuario atualizado com sucesso!!!"
            });
        }
        else {
            return response.json({
                result: result,
                message: "Erro ao atualizar usuario!!!"
            });
        }
    }
    else {
        return response.json({
            result: 0,
            message: "Erro ao atualizar usuario!!!"
        });
    }
}
exports.UpdateUser = UpdateUser;
