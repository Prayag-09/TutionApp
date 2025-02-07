import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
	user?: JwtPayload & { id: string; role: string };
}

export const authenticate = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	const authHeader: string | undefined = req.header('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(401).json({ error: 'Access Denied. No Token Provided' });
		return;
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload & { id: string; role: string };

		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid or Expired Token' });
		return;
	}
};

export const authorize = (roles: string[]) => {
	return (req: AuthRequest, res: Response, next: NextFunction): void => {
		if (!req.user) {
			res.status(401).json({ error: 'Unauthorized: Please log in' });
			return;
		}

		if (typeof req.user === 'string' || !roles.includes(req.user.role)) {
			res.status(403).json({ error: 'Forbidden: Access Denied' });
			return;
		}

		next();
	};
};
