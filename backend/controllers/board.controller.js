import Board from "../models/board.model.js";
import asyncHandler from "express-async-handler";

export const createBoard = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { title } = req.body;

	if (!title) {
		res.status(400);
		throw new Error("Board title not found!");
	} else {
		const newBoard = await Board.create({ title, createdBy: userId });

		res.status(201).json({
			_id: newBoard._id,
			createdBy: newBoard.createdBy,
			title: newBoard.title,
			categories: newBoard.categories,
			members: newBoard.members,
			createdAt: newBoard.createdAt,
			updatedAt: newBoard.updatedAt,
		});
	}
});
