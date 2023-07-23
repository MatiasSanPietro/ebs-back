"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const db_1 = require("../database/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => {
    // CHECK EXISTING USER
    const q = "SELECT * FROM usuario WHERE mail = ? OR nombre = ?";
    db_1.cxMysql.query(q, [req.body.mail, req.body.nombre], (err, data) => {
        if (err)
            return res.status(500).json(err);
        if (data.length)
            return res.status(409).json("El usuario ya existe!");
        // Hash the password and create a user
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.contraseña, salt);
        const insertQuery = "INSERT INTO usuario(`nombre`,`mail`,`contraseña`,`telefono`,`rol`) VALUES (?)";
        const values = [
            [req.body.nombre, req.body.mail, hash, req.body.telefono, "admin"],
        ];
        db_1.cxMysql.query(insertQuery, values, (err, data) => {
            if (err)
                return res.status(500).json(err);
            return res.status(200).json("El usuario se ha creado.");
        });
    });
};
exports.register = register;
const login = (req, res) => {
    // CHECK USER
    const q = "SELECT * FROM usuario WHERE mail = ?";
    db_1.cxMysql.query(q, [req.body.mail], (err, data) => {
        if (err)
            return res.status(500).json(err);
        if (data.length === 0)
            return res.status(404).json("Usuario no encontrado!");
        // Check password
        const isPasswordCorrect = bcryptjs_1.default.compareSync(req.body.contraseña, data[0].contraseña);
        if (!isPasswordCorrect)
            return res.status(400).json("Contraseña o usuario incorrecto!");
        const token = jsonwebtoken_1.default.sign({ id: data[0].id }, "jwtkey");
        const _a = data[0], { contraseña } = _a, other = __rest(_a, ["contrase\u00F1a"]);
        res
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(other);
    });
};
exports.login = login;
const logout = (_req, res) => {
    res
        .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .json("El usuario abandono la sesion.");
};
exports.logout = logout;
