import { Router } from "express";
import * as articulo from "../controllers/ArticuloCtrl";
// import * as usuario from "../controllers/AuthCtrl";

const router = Router();

router.get("/api/articulos", articulo.getArticulos);
router.get("/api/articulos/:id", articulo.getArticuloXID);

router.post("/api/articulos/insert", articulo.insertArticulo);
router.put("/api/articulos/update", articulo.actualizarArticulo);
router.delete("/api/articulos/delete/:id", articulo.eliminarArticulo);

// router.post("/register", usuario.register);
// router.post("/login", usuario.login);
// router.post("/logout", usuario.logout);

export default router;
