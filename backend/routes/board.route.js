import express from "express";
import { protect } from "../middlewares/protect.middleware.js";
import { createBoard, getBoardsInvitedTo, getUserBoards } from "../controllers/board.controller.js";

const router = express.Router();

router.route("/").post(protect, createBoard).get(protect, getUserBoards);
router.route("/invitedto").get(protect, getBoardsInvitedTo);

export default router;
