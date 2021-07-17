import jwt from "jsonwebtoken";

export const generateToken = (id, resetPassword) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: resetPassword ? "15m" : "30d",
	});
};
