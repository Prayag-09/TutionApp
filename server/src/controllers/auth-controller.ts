import { Request, Response } from 'express';
import { loginService } from '../services/auth-services';

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const data = await loginService(email, password);
		res.status(200).json({ success: true, ...data });
	} catch (error) {
		res.status(401).json({
			success: false,
			error: error instanceof Error ? error.message : 'Unauthorized',
		});
	}
};
