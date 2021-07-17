import express from "express";
import { forgotPassword, resetPassword } from "../controllers/reset-password.controller.js";
import { authResetToken } from "../middlewares/reset-password.middleware.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.route("/reset-password").post(authResetToken, resetPassword);

export default router;
