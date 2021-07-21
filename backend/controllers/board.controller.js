import Board from "../models/board.model.js";
import asyncHandler from "express-async-handler";

export const createBoard = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { title } = req.body;

	if (!title) {
		res.status(400);
		throw new Error("Board title not found!");
	} else {
		await Board.create({ title, createdBy: userId });
		res.status(201).json('Board created successfully!');
	}
});

export const getUserBoards = asyncHandler(async (req, res) => {
	const createdBy = req.user._id;
	const boards = await Board.find({ createdBy }).populate("createdBy members", "id name email");
	res.status(200).json(boards);
});

export const getBoardsInvitedTo = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const boards = await Board.find({ members: userId }).populate("createdBy members", "id name email");
	res.status(200).json(boards);
});
