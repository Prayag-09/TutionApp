import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.URL || ' ';

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('Successfully connected to DB');
	} catch (error) {
		console.error('Error connecting to the database:', error);
		process.exit(1);
	}
};

export default connectDB;
