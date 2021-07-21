import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const createUser = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body;
	const userExists = await User.findOne({ email });

	if (!email || !password || !name) {
		res.status(400);
		throw new Error("Some required field(s) not found!");
	} else if (userExists) {
		res.status(401);
		throw new Error(`User account associated with ${email} already exists`);
	} else {
		const user = await User.create({ name, email, password });
		res.status(201).json({
			id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	}
});

export const authenticateUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!email || !password) {
		res.status(400);
		throw new Error("Required field(s) not found!");
	} else if (!user) {
		res.status(401);
		throw new Error(`User account associated with ${email} doesn't exists`);
	} else if (user && user.matchPassword(password)) {
		res.status(200).json({
			id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	}
});
