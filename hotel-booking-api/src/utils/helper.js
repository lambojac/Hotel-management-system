import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);

	const hash = await bcrypt.hash(password, salt);
	return hash;
};

exports.compareHash = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};

exports.signToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 * 24 });
};

exports.validateToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};
