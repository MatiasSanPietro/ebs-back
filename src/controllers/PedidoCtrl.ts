import { cxMysql } from "../database/db";
import { Request, Response } from "express";

export const getPedidos = (_req: Request, res: Response) =>
  new Promise((_resolve, _reject) => {
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      console.log("MySQL Connection: ", connection.threadId);
      connection.query("SELECT * FROM pedido LIMIT 50", (err, results) => {
        if (err) console.error(err);
        res.send(results);
      });
    });
  });

export const getPedidoXID = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const idPedido = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      connection.query(
        "SELECT * FROM pedido WHERE id = ?",
        [idPedido],
        (err, results) => {
          if (err) console.error(err);
          res.send(results);
        }
      );
    });
  });

export const insertPedido = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const {
      articulo_id,
      usuario_id,
      estado,
      fecha_pedido,
      cantidad,
      precio_unitario,
    } = req.body;
    var values = [
      articulo_id,
      usuario_id,
      estado,
      fecha_pedido,
      cantidad,
      precio_unitario,
    ];
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql: string =
          "INSERT INTO pedido(articulo_id, usuario_id, estado, fecha_pedido, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(sql, values, (err, results) => {
          if (err) {
            console.error(err);
            res.json({ message: "Error al tratar de insertar" });
          } else {
            res.json({ message: "Pedido Insertado con exito" });
          }
        });
      }
    });
  });

export const actualizarPedido = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const {
      articulo_id,
      usuario_id,
      estado,
      fecha_pedido,
      cantidad,
      precio_unitario,
      id,
    } = req.body;
    var values = [
      articulo_id,
      usuario_id,
      estado,
      fecha_pedido,
      cantidad,
      precio_unitario,
      id,
    ];
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql: string =
          "UPDATE pedido SET articulo_id=?, usuario_id=?, estado=?, fecha_pedido=?, cantidad=?, precio_unitario=? WHERE id=?";
        connection.query(sql, values, (err, results) => {
          if (err) {
            console.error(err);
            res.json({ message: "Error al actualizar " + err });
          } else {
            res.json({ message: "Pedido Actualizado con exito" });
          }
        });
      }
    });
  });

export const eliminarPedido = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const idPedido = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      connection.query(
        "DELETE FROM pedido WHERE id = ?",
        [idPedido],
        (err, results) => {
          if (err) {
            console.error(err);
            res.json({ message: "Error al tratar de Eliminar" });
          } else {
            res.json({ message: "Pedido Eliminado con exito" });
          }
        }
      );
    });
  });
