import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";
import apiRouter from "./src/routes/index.js";

const app = express();

/** Routing middleware for endpoints */
app.use(cookieParser());
app.use(express.json({ extended: false }));
app.use("/api", apiRouter);

/** Error handling middleware */
app.use((req, res, next) => {
	const error = new Error();
	(error.name = "Not found"), (error.status = 404);
	error.message = "Route not found, Please try a valid endpoint";
	next(error);
});

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errMessage = err.message || "Something went wrong";
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errMessage,
		stack: err.stack,
	});
});

/** Database Connection */
connectDB();

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});
