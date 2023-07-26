import { cxMysql } from "../database/db";
import { Request, Response } from "express";

// Obtener todos los pedidos
export const getPedidos = (_req: Request, res: Response) =>
  new Promise((_resolve, _reject) => {
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      console.log("MySQL Connection: ", connection.threadId);
      connection.query("SELECT * FROM pedido", (err, results) => {
        if (err) console.error(err);
        res.send(results);
      });
    });
  });

// Obtener un pedido por su ID
export const getPedidoXID = (req: Request, res: Response) =>
  new Promise((_resolve, _reject) => {
    const pedidoId = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      connection.query(
        "SELECT * FROM pedido WHERE id = ?",
        [pedidoId],
        (err, results) => {
          if (err) console.error(err);
          res.send(results);
        }
      );
    });
  });

// Insertar un nuevo pedido
export const insertPedido = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const {
      usuario_id,
      fecha_pedido,
      telefono,
      direccion,
      metodo_pago,
      nombre_usuario,
      articulos,
      total,
      estado,
    } = req.body;
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
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql =
          "INSERT INTO pedido (usuario_id, fecha_pedido, telefono, direccion, metodo_pago, nombre_usuario, articulos, total, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, values, (err, results) => {
          if (err) {
            console.error(err);
            res.json({ message: "Error al tratar de insertar" });
          } else {
            res.json({ message: "Pedido Insertado con éxito" });
          }
        });
      }
    });
  });

// Actualizar un pedido existente
export const actualizarPedido = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const {
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
    } = req.body;
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
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql =
          "UPDATE pedido SET usuario_id=?, fecha_pedido=?, telefono=?, direccion=?, metodo_pago=?, nombre_usuario=?, articulos=?, total=?, estado=? WHERE id=?";
        connection.query(sql, values, (err, results) => {
          if (err) {
            console.error(err);
            res.json({ message: "Error al actualizar " + err });
          } else {
            res.json({ message: "Pedido Actualizado con éxito" });
          }
        });
      }
    });
  });

// Eliminar un pedido por su ID
export const eliminarPedido = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const pedidoId = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      connection.query(
        "DELETE FROM pedido WHERE id = ?",
        [pedidoId],
        (err, results) => {
          if (err) {
            console.error(err);
            res.json({ message: "Error al tratar de Eliminar" });
          } else {
            res.json({ message: "Pedido Eliminado con éxito" });
          }
        }
      );
    });
  });

// Obtener el último pedido por usuario ID
export const getLastPedidoByUserId = (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    connection.query(
      "SELECT * FROM pedido WHERE usuario_id = ? ORDER BY id DESC LIMIT 1",
      [userId],
      (err, results) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          res.send(results);
        }
      }
    );
  });
};

export default {
  getPedidos,
  getPedidoXID,
  insertPedido,
  actualizarPedido,
  eliminarPedido,
  getLastPedidoByUserId,
};
