"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarArticuloinsumo = exports.actualizarArticuloinsumo = exports.insertArticuloinsumo = exports.getArticuloinsumoById = exports.getArticuloinsumos = void 0;
const db_1 = require("../database/db");
const getArticuloinsumos = (_req, res) => new Promise((_resolve, _reject) => {
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        console.log("MySQL Connection: ", connection.threadId);
        try {
            connection.query("SELECT * FROM articuloinsumo", (err, results) => {
                if (err)
                    console.error(err);
                res.send(results);
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
exports.getArticuloinsumos = getArticuloinsumos;
const getArticuloinsumoById = (req, res) => new Promise((resolve, reject) => {
    const idArticuloinsumo = parseInt(req.params.id);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        try {
            connection.query("SELECT * FROM articuloinsumo WHERE id = ?", [idArticuloinsumo], (err, results) => {
                if (err)
                    console.error(err);
                res.send(results);
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
exports.getArticuloinsumoById = getArticuloinsumoById;
const insertArticuloinsumo = (req, res) => new Promise((resolve, reject) => {
    const { nombre, unidad_medida } = req.body;
    var values = [nombre, unidad_medida];
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "INSERT INTO articuloinsumo(nombre, unidad_medida) VALUES (?, ?)";
            try {
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        console.error(err);
                        res.json({ message: "Error al tratar de insertar" });
                    }
                    else {
                        res.json({ message: "Articuloinsumo Insertado con éxito" });
                    }
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });
});
exports.insertArticuloinsumo = insertArticuloinsumo;
const actualizarArticuloinsumo = (req, res) => new Promise((resolve, reject) => {
    const { nombre, unidad_medida, id } = req.body;
    var values = [nombre, unidad_medida, id];
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "UPDATE articuloinsumo SET nombre=?, unidad_medida=? WHERE id=?";
            try {
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        console.error(err);
                        res.json({ message: "Error al actualizar " + err });
                    }
                    else {
                        res.json({ message: "Articuloinsumo Actualizado con éxito" });
                    }
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });
});
exports.actualizarArticuloinsumo = actualizarArticuloinsumo;
const eliminarArticuloinsumo = (req, res) => {
    const idArticuloinsumo = parseInt(req.params.id);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        try {
            connection.query("DELETE FROM articuloinsumo WHERE id = ?", [idArticuloinsumo], (err, results) => {
                if (err)
                    throw err;
                res.json({ message: "Articuloinsumo Eliminado con éxito" });
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
};
exports.eliminarArticuloinsumo = eliminarArticuloinsumo;
