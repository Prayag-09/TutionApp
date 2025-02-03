import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import FeeService from '../services/feeService';

class FeeController {
	static addFee = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const fee = await FeeService.createFee(req.body);
			res
				.status(StatusCodes.CREATED)
				.json({ message: 'Fee added successfully', fee });
		} catch (error) {
			next(error);
		}
	};

	static editFee = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const fee = await FeeService.updateFee(req.body.feeId, req.body);
			if (!fee) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Fee not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Fee updated successfully', fee });
		} catch (error) {
			next(error);
		}
	};

	static archiveFee = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const fee = await FeeService.changeFeeStatus(req.body.feeId, 'Archived');
			if (!fee) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Fee not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Fee archived successfully', fee });
		} catch (error) {
			next(error);
		}
	};

	static restoreFee = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const fee = await FeeService.changeFeeStatus(req.body.feeId, 'Live');
			if (!fee) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Fee not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Fee restored successfully', fee });
		} catch (error) {
			next(error);
		}
	};
}

export default FeeController;
