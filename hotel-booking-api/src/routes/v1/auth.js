import express from "express";
import { register, login } from "../../controllers/auth.js";

const router = express.Router();

/**
 * @route      POST api/users/register
 * @desc       Register/Sign up a new user
 * @access     Public
 */
router.post("/register", register);

/**
 * @route      POST api/users/register
 * @desc       Login/Sign in a user
 * @access     Public
 */
router.post("/login", login);

export default router;
