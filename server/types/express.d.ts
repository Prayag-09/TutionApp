import { Request } from 'express';

declare global {
	namespace Express {
		interface Request {
			body: {
				email: any;
				password: string;
				role: string;
				[key: string]: any;
			};
		}
	}
}
