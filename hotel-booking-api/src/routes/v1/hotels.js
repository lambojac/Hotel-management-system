import express from "express";

/** Required files */
import {
	createHotel,
	getHotels,
	updateHotel,
	getHotel,
	deleteHotel,
} from "../../controllers/hotel.js";
import { verifyAdmin } from "../../middleware/auth.js";

const router = express.Router();

/**
 * @route      GET api/hotels/:id
 * @desc       Get a particular hotel details in the database
 * @access     Private
 */
router.get("/:hotelId", getHotel);

/**
 * @route      GET api/hotels
 * @desc       Get all hotels in the database
 * @access     Private
 */
router.get("/", getHotels);

/**
 * @route      POST api/hotels
 * @desc       Create a new hotels in the database
 * @access     Private
 */
router.post("/", verifyAdmin, createHotel);

/**
 * @route      PuT api/hotels/:id
 * @desc       Update hotel details in the database
 * @access     Private
 */
router.put("/:hotelId", verifyAdmin, updateHotel);

/**
 * @route      DELETE api/hotels/:id
 * @desc       Delete a particular hotel details in the database
 * @access     Private
 */
router.delete("/:hotelId", verifyAdmin, deleteHotel);

export default router;
