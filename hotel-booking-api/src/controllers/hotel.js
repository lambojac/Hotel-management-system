import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const getHotels = async (req, res, next) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

export const getHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.hotelId);
		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);

	try {
		const hotel = await newHotel.save();
		res.status(201).json(hotel);
	} catch (err) {
		next(err);
	}
};

export const updateHotel = async (req, res, next) => {
	try {
		// let hotel = await Hotel.findById(req.params.id);

		// if (!hotel) next(createError(404, "Hotel not found!"));

		const hotel = await Hotel.findByIdAndUpdate(
			req.params.hotelId,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(201).json(hotel);
	} catch (err) {
		next(err);
	}
};

export const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findByIdAndDelete(req.params.hotelId);
		res.status(200).json("Hotel has been deleted");
	} catch (err) {
		next(err);
	}
};

/**
 * 
{
    "name": "Opuluiche Home",
    "type": "hotel and Suit",
    "city": "Enugu",
    "address": "Victorial Island",
    "distance": "800km",
    "title": "Best Hotel and suit in the city",
    "desc": "Hptel description",
    "cheapestPrice": 100
}

 */
