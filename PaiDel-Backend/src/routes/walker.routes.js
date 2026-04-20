import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { allAvailableWalkers } from "../controllers/walker.controller.js";

const router = Router();

router.use(verifyToken)

router.route("/").get(allAvailableWalkers)

export default router;