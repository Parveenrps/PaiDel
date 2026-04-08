import { Router } from "express";
import { loginUser, registerUser, verifyOTP, logoutUser, refreshAccessToken, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-otp").post(verifyOTP);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyToken, logoutUser);
router.route("/refresh-token").post(verifyToken, refreshAccessToken);
router.route("/me").get(verifyToken, getCurrentUser);

export default router;