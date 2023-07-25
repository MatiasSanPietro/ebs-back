"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPedido = exports.actualizarPedido = exports.insertPedido = exports.getPedidoXID = exports.getPedidos = void 0;
const db_1 = require("../database/db");
const getPedidos = (_req, res) => new Promise((_resolve, _reject) => {
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        console.log("MySQL Connection: ", connection.threadId);
        connection.query("SELECT * FROM pedido LIMIT 50", (err, results) => {
            if (err)
                console.error(err);
            res.send(results);
        });
    });
});
exports.getPedidos = getPedidos;
const getPedidoXID = (req, res) => new Promise((resolve, reject) => {
    const idPedido = parseInt(req.params.id);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("SELECT * FROM pedido WHERE id = ?", [idPedido], (err, results) => {
            if (err)
                console.error(err);
            res.send(results);
        });
    });
});
exports.getPedidoXID = getPedidoXID;
const insertPedido = (req, res) => new Promise((resolve, reject) => {
    const { articulo_id, usuario_id, estado, fecha_pedido, cantidad, precio_unitario, } = req.body;
    var values = [
        articulo_id,
        usuario_id,
        estado,
        fecha_pedido,
        cantidad,
        precio_unitario,
    ];
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "INSERT INTO pedido(articulo_id, usuario_id, estado, fecha_pedido, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?, ?)";
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de insertar" });
                }
                else {
                    res.json({ message: "Pedido Insertado con exito" });
                }
            });
        }
    });
});
exports.insertPedido = insertPedido;
const actualizarPedido = (req, res) => new Promise((resolve, reject) => {
    const { articulo_id, usuario_id, estado, fecha_pedido, cantidad, precio_unitario, id, } = req.body;
    var values = [
        articulo_id,
        usuario_id,
        estado,
        fecha_pedido,
        cantidad,
        precio_unitario,
        id,
    ];
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "UPDATE pedido SET articulo_id=?, usuario_id=?, estado=?, fecha_pedido=?, cantidad=?, precio_unitario=? WHERE id=?";
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al actualizar " + err });
                }
                else {
                    res.json({ message: "Pedido Actualizado con exito" });
                }
            });
        }
    });
});
exports.actualizarPedido = actualizarPedido;
const eliminarPedido = (req, res) => new Promise((resolve, reject) => {
    const idPedido = parseInt(req.params.id);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("DELETE FROM pedido WHERE id = ?", [idPedido], (err, results) => {
            if (err) {
                console.error(err);
                res.json({ message: "Error al tratar de Eliminar" });
            }
            else {
                res.json({ message: "Pedido Eliminado con exito" });
            }
        });
    });
});
exports.eliminarPedido = eliminarPedido;
