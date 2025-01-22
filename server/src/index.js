const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

mongoose
	.connect(process.env.URL)
	.then(() => console.log('Successfully connected to DB'))
	.catch((err) => console.error('Error connecting to the database:', err));


	

app.listen(port, () => console.log(`Server connected to port ${port}`));
