"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarArticulo = exports.actualizarArticulo = exports.insertArticulo = exports.getArticuloXID = exports.getArticulos = void 0;
const db_1 = require("../database/db");
const getArticulos = (_req, res) => new Promise((_resolve, _reject) => {
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        console.log("MySQL Connection: ", connection.threadId);
        connection.query("SELECT * FROM articulo LIMIT 50", (err, results) => {
            if (err)
                console.error(err);
            //console.log('User Query Results: ', results);
            res.send(results);
        });
    });
});
exports.getArticulos = getArticulos;
const getArticuloXID = (req, res) => new Promise((resolve, reject) => {
    const idArt = parseInt(req.params.id);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("SELECT * FROM articulo WHERE id = ?", [idArt], (err, results) => {
            if (err)
                console.error(err);
            res.send(results);
        });
    });
});
exports.getArticuloXID = getArticuloXID;
const insertArticulo = (req, res) => new Promise((resolve, reject) => {
    const { imagen, descr, precio, rubro, titulo } = req.body;
    var values = [imagen, descr, precio, rubro, titulo];
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "INSERT INTO articulo(imagen, descr, precio, rubro, titulo) VALUES (?, ?, ?, ?, ?)";
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de insertar" });
                }
                else {
                    res.json({ message: "Articulo Insertado con exito" });
                }
            });
        }
    });
});
exports.insertArticulo = insertArticulo;
const actualizarArticulo = (req, res) => new Promise((resolve, reject) => {
    const { imagen, descr, precio, rubro, titulo, id } = req.body;
    var values = [imagen, descr, precio, rubro, titulo, id];
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "UPDATE articulo SET imagen=?, descr=?, precio=?, rubro=?, titulo=? WHERE id=?";
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al actualizar " + err });
                }
                else {
                    res.json({ message: "Articulo Actualizado con exito" });
                }
            });
        }
    });
});
exports.actualizarArticulo = actualizarArticulo;
const eliminarArticulo = (req, res) => new Promise((resolve, reject) => {
    const idArt = parseInt(req.params.id);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("DELETE FROM articulo WHERE id = ?", [idArt], (err, results) => {
            if (err) {
                console.error(err);
                res.json({ message: "Error al tratar de Eliminar" });
            }
            else {
                res.json({ message: "Articulo Eliminado con exito" });
            }
        });
    });
});
exports.eliminarArticulo = eliminarArticulo;
