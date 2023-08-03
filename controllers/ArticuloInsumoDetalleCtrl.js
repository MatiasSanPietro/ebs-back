"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getarticuloinsumodetallebyarticuloinsumoid = void 0;
const db_1 = require("../database/db");
const Getarticuloinsumodetallebyarticuloinsumoid = (req, res) => {
    const articuloinsumoId = req.params.id; // Suponiendo que el parámetro id es el ID del articuloinsumo
    db_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        console.log("MySQL Connection: ", connection.threadId);
        try {
            connection.query("SELECT ad.cantidad FROM articuloinsumo a JOIN articuloinsumodetalle ad ON a.id = ad.articuloinsumo_id WHERE a.id = ?", [articuloinsumoId], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                }
                res.send(results);
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
        finally {
            connection.release();
        }
    });
};
exports.Getarticuloinsumodetallebyarticuloinsumoid = Getarticuloinsumodetallebyarticuloinsumoid;
