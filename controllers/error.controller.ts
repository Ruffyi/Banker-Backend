import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';

import dotenv from 'dotenv';

dotenv.config({ path: './../config/.env' });

const sendErrorDev = (err: CustomError, res: Response) => {
	const { message, status = 'fail', statusCode = 500, stack } = err;

	res.status(statusCode).send({
		error: {
			message,
			status,
			statusCode,
		},
		stack,
	});
};

const sendErrorProd = (err: CustomError, res: Response) => {
	const { statusCode = 500, status = 'fail' } = err;
	res.status(statusCode).send({
		error: {
			status,
			message: 'Something goes wrong :(',
		},
	});
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
	return next(new CustomError(`Server can't handle ${req.originalUrl}`, 404));
};

const globalErrorMiddleware = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (process.env.SERVER_MODE === 'development') {
		sendErrorDev(err, res);
	}

	if (process.env.SERVER_MODE === 'production') {
		sendErrorProd(err, res);
	}
};

export { globalErrorMiddleware, notFound };
