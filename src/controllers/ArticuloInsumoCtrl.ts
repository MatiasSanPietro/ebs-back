import { cxMysql } from "../database/db";
import { Request, Response } from "express";

export const getArticuloinsumos = (_req: Request, res: Response) =>
  new Promise((_resolve, _reject) => {
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      console.log("MySQL Connection: ", connection.threadId);
      try {
        connection.query("SELECT * FROM articuloinsumo", (err, results) => {
          if (err) console.error(err);
          res.send(results);
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  });

export const getArticuloinsumoById = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const idArticuloinsumo = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      try {
        connection.query(
          "SELECT * FROM articuloinsumo WHERE id = ?",
          [idArticuloinsumo],
          (err, results) => {
            if (err) console.error(err);
            res.send(results);
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  });

export const insertArticuloinsumo = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const { nombre, unidad_medida } = req.body;
    var values = [nombre, unidad_medida];
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql: string =
          "INSERT INTO articuloinsumo(nombre, unidad_medida) VALUES (?, ?)";
        try {
          connection.query(sql, values, (err, results) => {
            if (err) {
              console.error(err);
              res.json({ message: "Error al tratar de insertar" });
            } else {
              res.json({ message: "Articuloinsumo Insertado con éxito" });
            }
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  });

export const actualizarArticuloinsumo = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const { nombre, unidad_medida, id } = req.body;
    var values = [nombre, unidad_medida, id];
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql: string =
          "UPDATE articuloinsumo SET nombre=?, unidad_medida=? WHERE id=?";
        try {
          connection.query(sql, values, (err, results) => {
            if (err) {
              console.error(err);
              res.json({ message: "Error al actualizar " + err });
            } else {
              res.json({ message: "Articuloinsumo Actualizado con éxito" });
            }
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  });

export const eliminarArticuloinsumo = (req: Request, res: Response) => {
  const idArticuloinsumo = parseInt(req.params.id);
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    try {
      connection.query(
        "DELETE FROM articuloinsumo WHERE id = ?",
        [idArticuloinsumo],
        (err, results) => {
          if (err) throw err;
          res.json({ message: "Articuloinsumo Eliminado con éxito" });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
