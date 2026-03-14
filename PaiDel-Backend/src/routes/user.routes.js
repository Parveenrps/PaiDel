import { Router } from "express";

const router = Router();

router.route("/register").post(()=>{
    console.log("register route")
});

export default router;