import express from "express";
import http from "http";
const app = express();
import routes from "./routes/articulo";
import authRoutes from "./routes/auth";
import pedidoController from "./routes/pedido";

var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { cxMysql } from "./database/db";
cxMysql.getConnection;

app.use(routes);
app.use(authRoutes);
app.use(pedidoController);

var server = http.createServer(app);
var port: string = process.env.PORT || "5000";

server.listen(port);
console.log("Servidor iniciado en puerto ", port);
