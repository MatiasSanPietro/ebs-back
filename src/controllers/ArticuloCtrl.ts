import { cxMysql } from "../database/db";
import { Request, Response } from "express";

export const getArticulos = (_req: Request, res: Response) =>
  new Promise((_resolve, _reject) => {
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      console.log("MySQL Connection: ", connection.threadId);
      try {
        connection.query("SELECT * FROM articulo LIMIT 50", (err, results) => {
          if (err) console.error(err);
          //console.log('User Query Results: ', results);
          res.send(results);
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  });

export const getArticuloXID = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const idArt = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      try {
        connection.query(
          "SELECT * FROM articulo WHERE id = ?",
          [idArt],
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

export const insertArticulo = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const { imagen, descr, precio, rubro, titulo, rubro_secundario } = req.body;
    var values = [imagen, descr, precio, rubro, titulo, rubro_secundario];
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql: string =
          "INSERT INTO articulo(imagen, descr, precio, rubro, titulo, rubro_secundario) VALUES (?, ?, ?, ?, ?, ?)";
        try {
          connection.query(sql, values, (err, results) => {
            if (err) {
              console.error(err);
              res.json({ message: "Error al tratar de insertar" });
            } else {
              res.json({ message: "Articulo Insertado con exito" });
            }
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  });

export const actualizarArticulo = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const { imagen, descr, precio, rubro, titulo, rubro_secundario, id } =
      req.body;
    var values = [imagen, descr, precio, rubro, titulo, rubro_secundario, id];
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql: string =
          "UPDATE articulo SET imagen=?, descr=?, precio=?, rubro=?, titulo=?, rubro_secundario=? WHERE id=?";
        try {
          connection.query(sql, values, (err, results) => {
            if (err) {
              console.error(err);
              res.json({ message: "Error al actualizar " + err });
            } else {
              res.json({ message: "Articulo Actualizado con exito" });
            }
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  });

export const eliminarArticulo = (req: Request, res: Response) => {
  const idArt = parseInt(req.params.id);
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    try {
      connection.query(
        "DELETE FROM articulo WHERE id = ?",
        [idArt],
        (err, results) => {
          if (err) throw err;
          res.json({ message: "Articulo Eliminado con exito" });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
