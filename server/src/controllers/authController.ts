import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/schema';

const login = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: 'Invalid credentials' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: 'Invalid credentials' });
		}
		const token = jwt.sign(
			{ _id: user._id, username: user.username, role: user.role },
			process.env.JWT_SECRET as string,
			{ expiresIn: '1h' }
		);
		res
			.status(StatusCodes.OK)
			.json({ token, user: { username: user.username, role: user.role } });
	} catch (error) {
		next(error);
	}
};

export default {
	login,
};
