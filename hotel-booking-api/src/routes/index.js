import express from "express";

const router = express.Router();

import authRoute from "./v1/auth.js";
import usersRoute from "./v1/users.js";
import hotelsRoute from "./v1/hotels.js";
import roomsRoute from "./v1/rooms.js";

router.use("/v1/auth", authRoute);
router.use("/v1/users", usersRoute);
router.use("/v1/hotels", hotelsRoute);
router.use("/v1/rooms", roomsRoute);

export default router;
