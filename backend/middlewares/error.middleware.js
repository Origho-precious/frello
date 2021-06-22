export const notFound = (req, res, next) => {
	const error = new Error(`Not found - ${req.originalURL}`);
	res.statusCode(404);
	next(error);
};

export const errorHandler = (error, req, res, next) => {
	const statusCode = req.statusCode === 200 ? 500 : req.statusCode;
	res.statusCode(statusCode);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};
