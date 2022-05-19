import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

const signup = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		res.status(200).send({
			message: 'Hi',
		});
	}
);

export { signup };
