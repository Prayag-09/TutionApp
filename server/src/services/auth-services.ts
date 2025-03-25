import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const loginService = async (email: string, password: string) => {
	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('Invalid email or password');
		}

		const JWT_SECRET = process.env.JWT_SECRET;
		if (!JWT_SECRET) {
			console.error('JWT SECRET NOT PROVIDED');
			throw new Error('Internal Server Error');
		}

		let isMatch = false;

		isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new Error('Invalid email or password');
		}
		const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: '1h',
		});

		return { token, role: user.role, email: user.email, userId: user._id };
	} catch (error: any) {
		console.error('❌ Login Error:', error.message);
		throw new Error('Authentication failed');
	}
};
