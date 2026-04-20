import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getAllOrders } from "../controllers/order.controller.js";


const router = Router();

router.use(verifyToken);

router.route("/").post(createOrder).get(getAllOrders);



export default router;