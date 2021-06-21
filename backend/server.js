import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
	res.send(`API running on port ${process.env.PORT}`);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} on port ${process.env.NODE_ENV}`
			.yellow.bold
	)
);
