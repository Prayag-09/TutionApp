const mongoose = require('mongoose');
const {
	Subject,
	Grade,
	Teacher,
	Parent,
	Student,
	Attendance,
	User,
	Quiz,
} = require('../database/schema.js');
const express = require('express');

const app = express();

app.use(express.json());

const port = 3000;

mongoose
	.connect('mongodb+srv://zerone:zerone@tuitionapp.xdnke.mongodb.net/')
	.then(() => console.log('Successfully connected to DB'))
	.catch((err) => console.error('Error connecting to the database:', err));

app.listen(port, () => console.log(`Server connected to port ${port}`));
