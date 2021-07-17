import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
	const token = req.headers.authorization;

	if (token && token.startsWith("Bearer")) {
		try {
			const decode = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

			req.resetId = decode.id;

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not authorized, token expired!");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token found");
	}
});
