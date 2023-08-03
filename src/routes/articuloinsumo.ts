import { Router } from "express";
import * as articuloinsumo from "../controllers/ArticuloInsumoCtrl";

const router = Router();

router.get("/api/articuloinsumo", articuloinsumo.getArticuloinsumos);
router.get("/api/articuloinsumo/:id", articuloinsumo.getArticuloinsumoById);
router.post("/api/articuloinsumo/insert", articuloinsumo.insertArticuloinsumo);
router.put(
  "/api/articuloinsumo/update",
  articuloinsumo.actualizarArticuloinsumo
);
router.delete(
  "/api/articuloinsumo/delete/:id",
  articuloinsumo.eliminarArticuloinsumo
);

export default router;
