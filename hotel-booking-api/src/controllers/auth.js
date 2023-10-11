import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hashPassword = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashPassword,
			isAdmin:req.body.isAdmin
		});

		await newUser.save();
		res.status(201).json({ msg: "User has been Created", data: newUser });
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) return next(createError(404, "User not found!"));

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordCorrect)
			return next(createError(400, "WrongPassword or Username"));

		const { password, isAdmin, __v, ...otherDetails } = user._doc;

		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET
		);
		
		res.cookie("access_token", token, { httpOnly: true })
			.status(200)
			.json({ ...otherDetails });
	} catch (err) {
		next(err);
	}
};
