import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const loginService = async (email: string, password: string) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Invalid user');
	}

	const JWT_SECRET = process.env.JWT_SECRET || ' ';
	if (!JWT_SECRET) {
		console.log('JWT KEY NOT PROVIDED');
	}
	const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
		expiresIn: '1h',
	});

	return { token, role: user.role, email: user.email };
};
