import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	const roomData = new Room(req.body);

	try {
		const newRoom = await roomData.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: newRoom._id },
			});
		} catch (error) {
			next(error);
		}
		res.status(201).json(newRoom);
	} catch (error) {
		next(error);
	}
};

export const updateRoom = async (req, res, next) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
	} catch (error) {
		next(error);
	}
};

export const getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.roomId);
		res.status(200).json(room);
	} catch (error) {
		next(error);
	}
};

export const getAllRoom = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (error) {
		next(error);
	}
};

export const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	try {
		await Room.findByIdAndDelete(req.params.roomId);
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: req.params.roomId },
			});
		} catch (error) {
			next(error);
		}
		res.status(200).json("Room has been deleted");
	} catch (error) {
		next(error);
	}
};
