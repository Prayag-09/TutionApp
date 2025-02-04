import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: Array<string>) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		if (!req.user || !roles.includes(req.user.role)) {
			res.status(403).json({ message: 'Access denied' });
			return;
		}
		next();
	};
};
