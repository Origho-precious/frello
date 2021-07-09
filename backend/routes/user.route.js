import express from "express";
import {
	authenticateUser,
	createUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(createUser);
router.post("/login", authenticateUser);

export default router;
