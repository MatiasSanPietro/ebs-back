"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cxMysql = void 0;
const mysql2_1 = require("mysql2");
exports.cxMysql = (0, mysql2_1.createPool)({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "proyecto",
    connectionLimit: 100, //100 es el valor por defecto
});
exports.cxMysql.getConnection((error) => {
    if (error) {
        console.log("El error de conexion es: " + error);
        return;
    }
    console.log("Conectado a la base de datos!");
});
