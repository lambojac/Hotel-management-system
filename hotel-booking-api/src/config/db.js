import mongoose from "mongoose";
import dotenv from "dotenv";

// import config from "./keys.js";

// const db = config.MONGOURI;

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://kennie:869480Ak@cluster0.zkjbfkp.mongodb.net/lambo?retryWrites=true&w=majority');
		console.log("DB Connection was successful");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};



export default connectDB;
