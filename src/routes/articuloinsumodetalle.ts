import { Router } from "express";
import * as articuloinsumodetalle from "../controllers/ArticuloInsumoDetalleCtrl";

const router = Router();

router.get(
  "/api/articuloinsumodetalle/:id",
  articuloinsumodetalle.Getarticuloinsumodetallebyarticuloinsumoid
);

export default router;
