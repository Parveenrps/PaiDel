import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getAllAvailableWalkers } from "../controllers/user.controller.js";



const router = Router();


router.use(verifyToken);

router.route("/walkers").get(getAllAvailableWalkers)

export default router;