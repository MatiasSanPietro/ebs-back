"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastPedidoByUserId = exports.eliminarPedido = exports.actualizarPedido = exports.insertPedido = exports.getPedidoXID = exports.getPedidos = void 0;
const db_1 = require("../database/db");
// Obtener todos los pedidos
const getPedidos = (_req, res) => new Promise((_resolve, _reject) => {
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        console.log("MySQL Connection: ", connection.threadId);
        try {
            connection.query("SELECT * FROM pedido", (err, results) => {
                if (err)
                    throw err;
                res.send(results);
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
exports.getPedidos = getPedidos;
// Obtener un pedido por su ID
const getPedidoXID = (req, res) => new Promise((_resolve, _reject) => {
    const pedidoId = parseInt(req.params.id);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        try {
            connection.query("SELECT * FROM pedido WHERE id = ?", [pedidoId], (err, results) => {
                if (err)
                    throw err;
                res.send(results);
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
exports.getPedidoXID = getPedidoXID;
// Insertar un nuevo pedido
const insertPedido = (req, res) => new Promise((resolve, reject) => {
    const { usuario_id, fecha_pedido, telefono, direccion, metodo_pago, nombre_usuario, articulos, total, estado, } = req.body;
    var values = [
        usuario_id,
        fecha_pedido,
        telefono,
        direccion,
        metodo_pago,
        nombre_usuario,
        articulos,
        total,
        estado,
    ];
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "INSERT INTO pedido (usuario_id, fecha_pedido, telefono, direccion, metodo_pago, nombre_usuario, articulos, total, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try {
                connection.query(sql, values, (err, results) => {
                    if (err)
                        throw err;
                    res.json({ message: "Pedido Insertado con éxito" });
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });
});
exports.insertPedido = insertPedido;
// Actualizar un pedido existente
const actualizarPedido = (req, res) => new Promise((resolve, reject) => {
    const { usuario_id, fecha_pedido, telefono, direccion, metodo_pago, nombre_usuario, articulos, total, estado, id, } = req.body;
    var values = [
        usuario_id,
        fecha_pedido,
        telefono,
        direccion,
        metodo_pago,
        nombre_usuario,
        articulos,
        total,
        estado,
        id,
    ];
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "UPDATE pedido SET usuario_id=?, fecha_pedido=?, telefono=?, direccion=?, metodo_pago=?, nombre_usuario=?, articulos=?, total=?, estado=? WHERE id=?";
            try {
                connection.query(sql, values, (err, results) => {
                    if (err)
                        throw err;
                    res.json({ message: "Pedido Actualizado con éxito" });
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });
});
exports.actualizarPedido = actualizarPedido;
// Eliminar un pedido por su ID
const eliminarPedido = (req, res) => new Promise((resolve, reject) => {
    const pedidoId = parseInt(req.params.id);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        try {
            connection.query("DELETE FROM pedido WHERE id = ?", [pedidoId], (err, results) => {
                if (err)
                    throw err;
                res.json({ message: "Pedido Eliminado con éxito" });
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
exports.eliminarPedido = eliminarPedido;
// Obtener el último pedido por usuario ID
const getLastPedidoByUserId = (req, res) => {
    const userId = parseInt(req.params.userId);
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        try {
            connection.query("SELECT * FROM pedido WHERE usuario_id = ? ORDER BY id DESC LIMIT 1", [userId], (err, results) => {
                if (err)
                    throw err;
                res.send(results);
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
};
exports.getLastPedidoByUserId = getLastPedidoByUserId;
exports.default = {
    getPedidos: exports.getPedidos,
    getPedidoXID: exports.getPedidoXID,
    insertPedido: exports.insertPedido,
    actualizarPedido: exports.actualizarPedido,
    eliminarPedido: exports.eliminarPedido,
    getLastPedidoByUserId: exports.getLastPedidoByUserId,
};
