import { Request, Response, NextFunction } from 'express';

type AsyncRouteHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<any>;

const catchAsync = (fn: AsyncRouteHandler) => {
	return (req: Request, res: Response, next: NextFunction): Promise<any> => {
		return fn(req, res, next).catch(next);
	};
};

export default catchAsync;
