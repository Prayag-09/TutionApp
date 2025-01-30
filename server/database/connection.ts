const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const DATABASE_URL = process.env.URL || '';

const connectDB = async () => {
	try {
		mongoose
			.connect(URL)
			.then(() => console.log('Successfully connected to DB'))
			.catch((err: unknown) =>
				console.error('Error connecting to the database:', err)
			);
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
};

module.exports = connectDB;
