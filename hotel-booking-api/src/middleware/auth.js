import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		return next(createError(401, "You are not authenticated!"));
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return next(createError(403, "Token is not valid!"));
		req.user = user;
		next();
	});
};

export const verifyUser = (req, res, next) => {
	verifyToken(req, res, () => {
		console.log(`req.user.id ${req.user.id}`);
		console.log(`req.params.id ${req.params.userId}`);
		console.log(`req.isAdmin ${req.user.isAdmin}`);
		if (req.user.id === req.params.userId || req.user.isAdmin) {
			next();
		} else {
			return next(createError(403, "You are not authorized!"));
		}
	});
};

export const authorizeUser = (req, res, next) => {
	if (req.user.id === req.params.userId || req.user.isAdmin) {
		console.log(`AuthRoute req.params.id ${req.params.userId}`);
		console.log(`AuthRoute req.user.id ${req.user.id}`);
		next();
	} else {
		return next(createError(403, "You are not authorized!"));
	}
};

export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			console.log(req.user.isAdmin);
			next();
		} else {
			console.log(req.user.isAdmin);
			return next(createError(403, "You are not authorized!"));
		}
	});
};
