import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = err.statusCode || 500;
	let message = err.message || 'Internal Server Error';
	let errors: string[] = [];

	// 🔹 Mongoose Validation Error (e.g., required fields missing)
	if (err instanceof mongoose.Error.ValidationError) {
		statusCode = 400;
		message = 'Validation Error';
		errors = Object.values(err.errors).map((error) => error.message);
	}

	// 🔹 Mongoose Cast Error (e.g., invalid ObjectId format)
	else if (err instanceof mongoose.Error.CastError) {
		statusCode = 400;
		message = `Invalid ${err.path}: ${err.value}`;
		errors = [`${err.path} must be a valid ${err.kind}`];
	}

	// 🔹 Duplicate Key Error (e.g., unique email constraint)
	else if (err.code === 11000) {
		statusCode = 409; // Conflict
		message = 'Duplicate Key Error';
		const field = Object.keys(err.keyPattern)[0];
		errors = [`${field} already exists.`];
	}

	// 🔹 Mongoose General Errors
	else if (err instanceof mongoose.Error) {
		statusCode = 500;
		message = 'Database Error';
		errors = [err.message];
	}

	// 🔹 Custom Errors (e.g., manually thrown errors)
	else if (err instanceof Error) {
		errors = [err.message];
	}

	// Send JSON Response
	res.status(statusCode).json({
		success: false,
		message,
		errors,
	});
};
