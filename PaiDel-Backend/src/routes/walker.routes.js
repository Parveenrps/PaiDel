import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getAllAvailableOrders } from "../controllers/walker.controller.js";
import { get } from "mongoose";

const router = Router();

router.use(verifyToken)

router.route("/available-orders").get(getAllAvailableOrders);

export default router;