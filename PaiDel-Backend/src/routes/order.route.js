import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";


const router = Router();

router.use(verifyToken);

router.route("/").post(createOrder).get(getAllOrders);
router.route("/:orderID").patch(updateOrderStatus);

export default router;