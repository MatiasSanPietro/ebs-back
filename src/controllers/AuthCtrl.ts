import { cxMysql } from "../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  // CHECK EXISTING USER
  const q = "SELECT * FROM usuario WHERE mail = ? OR nombre = ?";

  cxMysql.query(q, [req.body.mail, req.body.nombre], (err: any, data: any) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("El usuario ya existe!");

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.contraseña, salt);

    const insertQuery =
      "INSERT INTO usuario(`nombre`,`mail`,`contraseña`,`telefono`,`rol`) VALUES (?)";
    const values = [
      [req.body.nombre, req.body.mail, hash, req.body.telefono, "admin"],
    ];

    cxMysql.query(insertQuery, values, (err: any, data: any) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("El usuario se ha creado.");
    });
  });
};

export const login = (req: Request, res: Response) => {
  // CHECK USER
  const q = "SELECT * FROM usuario WHERE mail = ?";

  cxMysql.query(q, [req.body.mail], (err: any, data: any) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Usuario no encontrado!");

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.contraseña,
      data[0].contraseña
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Contraseña o usuario incorrecto!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { contraseña, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (_req: Request, res: Response) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("El usuario abandono la sesion.");
};
