import { Router } from "express";
import * as instrumento from "../controllers/ArticuloCtrl";

const router = Router();

router.get("/api/articulos", instrumento.getArticulos);
router.get("/api/articulos/:id", instrumento.getArticuloXID);

router.post("/api/articulos/insert", instrumento.insertArticulo);
router.put("/api/articulos/update", instrumento.actualizarArticulo);
router.delete("/api/articulos/delete/:id", instrumento.eliminarArticulo);

export default router;
