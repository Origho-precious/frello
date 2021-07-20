import express from "express";
import { protect } from "../middlewares/protect.middleware.js";
import { createBoard, getUserBoards } from "../controllers/board.controller.js";

const router = express.Router();

router.route("/").post(protect, createBoard).get(protect, getUserBoards);

export default router;
