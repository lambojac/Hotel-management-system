import express from "express";

/** Required files */
import {
	createRoom,
	deleteRoom,
	getAllRoom,
	getRoom,
	updateRoom,
} from "../../controllers/room.js";
import { verifyAdmin } from "../../middleware/auth.js";

const router = express.Router();

/**
 * @route      GET api/hotels/:id
 * @desc       Get a particular hotel details in the database
 * @access     Private
 */
router.get("/:roomId", getRoom);

/**
 * @route      GET api/hotels
 * @desc       Get all hotels in the database
 * @access     Private
 */
router.get("/", getAllRoom);

/**
 * @route      POST api/hotels
 * @desc       Create a new hotels in the database
 * @access     Private
 */
router.post("/:hotelId", verifyAdmin, createRoom);

/**
 * @route      PuT api/hotels/:id
 * @desc       Update hotel details in the database
 * @access     Private
 */
router.put("/:roomId", verifyAdmin, updateRoom);

/**
 * @route      DELETE api/hotels/:id
 * @desc       Delete a particular hotel details in the database
 * @access     Private
 */
router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom);

export default router;
