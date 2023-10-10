import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		// let hotel = await User.findById(req.params.id);

		// if (!hotel) next(createError(404, "Hotel not found!"));
		console.log(req.params.userId);

		const user = await User.findByIdAndUpdate(
			req.params.userId,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(201).json(user);
	} catch (err) {
		next(err);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.userId);
		res.status(200).json("User has been deleted");
	} catch (err) {
		next(err);
	}
};
