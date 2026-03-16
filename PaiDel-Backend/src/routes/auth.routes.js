import { Router } from "express";
import { registerUser, verifyOTP } from "../controllers/auth.controller.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-phone").post(verifyOTP);

export default router;