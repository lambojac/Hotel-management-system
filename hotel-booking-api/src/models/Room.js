import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			require: true,
		},
		desc: {
			type: String,
			require: true,
		},
		maxPersons: {
			type: String,
			required: true,
		},
		roomNumbers: [{ number: Number, bookedDates: { type: [Date] } }],
	},
	{ timestamps: true }
);

const Room = mongoose.model("room", RoomSchema);

export default Room;
