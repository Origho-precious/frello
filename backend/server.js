import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";
import resetPasswordRoutes from "./routes/reset-password.js";
import boardRoutes from "./routes/board.route.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", resetPasswordRoutes);
app.use("/api/boards", boardRoutes);

app.use("/", (_req, res) => {
	res.send(`API running on port ${process.env.PORT}`);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
			.yellow.bold
	)
);
