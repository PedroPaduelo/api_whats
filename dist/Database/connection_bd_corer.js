"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const connection = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: process.env.PGHOST,
        port: 5800,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD
    },
    pool: {
        min: 0,
        max: 250
    },
    useNullAsDefault: true
});
exports.default = connection;
