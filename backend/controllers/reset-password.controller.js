import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { sendMail } from "../utils/mailer.js";

export const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const userExists = await User.findOne({ email });

	if (!email) {
		res.status(400);
		throw new Error("Email not found!");
	} else if (!userExists) {
		res.status(401);
		throw new Error(`User account associated with ${email} doesn't exists`);
	} else {
		const token = generateToken(email, true);
		const mailMsg = `Click <a href="http://localhost:3000/reset-password?token=${token}&step=2">here</a> to reset your password`;

		sendMail("Reset Password", email, mailMsg, () => {
			res
				.status(200)
				.json(
					"A link to reset your password has been successfully sent to your mail. If not found in inbox, check promotions or spam (bin)"
				);
		});
	}
});

export const resetPassword = asyncHandler(async (req, res) => {
	const { password } = req.body;
	const email = req.userEmail;

	if (!password) {
		res.status(400);
		throw new Error("New password not found");
	} else {
		const user = await User.findOne({ email });

		if (user) {
			user.password = password;

			await user.save();

			res.status(200).json("Password reset successful");
		} else {
			res.status(401);
			throw new Error("User not found");
		}
	}
});
