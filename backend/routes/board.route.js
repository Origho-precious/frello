import express from "express";
import { protect } from "../middlewares/protect.middleware.js";
import { createBoard } from "../controllers/board.controller.js";

const router = express.Router();

router.route("/").post(protect, createBoard);

export default router;
