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
      try {
        connection.query("SELECT * FROM pedido", (err, results) => {
          if (err) throw err;
          res.send(results);
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
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
      try {
        connection.query(
          "SELECT * FROM pedido WHERE id = ?",
          [pedidoId],
          (err, results) => {
            if (err) throw err;
            res.send(results);
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
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
        try {
          connection.query(sql, values, (err, results) => {
            if (err) throw err;
            res.json({ message: "Pedido Insertado con éxito" });
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
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
        try {
          connection.query(sql, values, (err, results) => {
            if (err) throw err;
            res.json({ message: "Pedido Actualizado con éxito" });
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
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
      try {
        connection.query(
          "DELETE FROM pedido WHERE id = ?",
          [pedidoId],
          (err, results) => {
            if (err) throw err;
            res.json({ message: "Pedido Eliminado con éxito" });
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
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
    try {
      connection.query(
        "SELECT * FROM pedido WHERE usuario_id = ? ORDER BY id DESC LIMIT 1",
        [userId],
        (err, results) => {
          if (err) throw err;
          res.send(results);
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
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
