import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const createUser = asyncHandler(async (req, res, next) => {
	const { email, name, password } = req.body;
	const userExists = await User.findOne({ email });

	if (!email || !password || !name) {
		res.status(400);
		throw new Error("Some required field(s) not found!");
	} else if (userExists) {
		res.status(401);
		throw new Error(`User with Email already exists`);
	} else {
		const user = await User.create({ name, email, password });

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	}
});
