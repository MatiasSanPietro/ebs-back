import { Router } from "express";
import * as pedidoController from "../controllers/PedidoCtrl";

const router = Router();

router.get("/api/pedidos", pedidoController.getPedidos);
router.get("/api/pedidos/:id", pedidoController.getPedidoXID);
router.post("/api/pedidos/insert", pedidoController.insertPedido);
router.put("/api/pedidos/update", pedidoController.actualizarPedido);
router.delete("/api/pedidos/delete/:id", pedidoController.eliminarPedido);

export default router;
