import express from "express";
import {
	getUser,
	getUsers,
	updateUser,
	deleteUser,
} from "../../controllers/user.js";

import { verifyToken, verifyAdmin, verifyUser } from "../../middleware/auth.js";

const router = express.Router();

/**
 * @route      GET api/users
 * @desc       Get all users in the database
 * @access     Private
 */
router.get("/", verifyAdmin, getUsers);

/**
 * @route      GET api/users/:userId
 * @desc       Get a user from the database
 * @access     Private
 */
// router.get("/:userId", verifyToken, verifUser, getUsers);
router.get("/:userId", verifyUser, getUser);

/**
 * @route      GET api/users/:userId
 * @desc       Update a user information
 * @access     Private
 */
router.put("/:userId", verifyUser, updateUser);

/**
 * @route      DELETE api/users/:userId
 * @desc       Delete a user from the system
 * @access     Private
 */
router.delete("/:userId", verifyUser, deleteUser);

export default router;

