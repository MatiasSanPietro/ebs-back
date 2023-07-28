import { cxMysql } from "../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  try {
    // CHECK EXISTING USER
    const q = "SELECT * FROM usuario WHERE mail = ? OR nombre = ?";
    cxMysql.query(
      q,
      [req.body.mail, req.body.nombre],
      (err: any, data: any) => {
        if (err) throw err;
        if (data.length) return res.status(409).json("El usuario ya existe!");

        // Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const insertQuery =
          "INSERT INTO usuario(`nombre`,`mail`,`password`,`telefono`,`rol`) VALUES (?)";
        const values = [
          [req.body.nombre, req.body.mail, hash, req.body.telefono, "cliente"],
        ];

        cxMysql.query(insertQuery, values, (err: any, data: any) => {
          if (err) throw err;
          return res.status(200).json("El usuario se ha creado.");
        });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = (req: Request, res: Response) => {
  try {
    // CHECK USER
    const q = "SELECT * FROM usuario WHERE mail = ?";
    cxMysql.query(q, [req.body.mail], (err: any, data: any) => {
      if (err) throw err;
      if (data.length === 0)
        return res.status(404).json("Usuario no encontrado!");

      // Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!isPasswordCorrect)
        return res.status(400).json("Contraseña o usuario incorrecto!");

      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (_req: Request, res: Response) => {
  try {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("El usuario abandonó la sesión.");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
