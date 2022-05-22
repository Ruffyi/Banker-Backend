import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';

import dotenv from 'dotenv';

dotenv.config({ path: './../config/.env' });

const sendErrorDev = (err: CustomError, res: Response) => {
	const { message, status = 'fail', statusCode = 500, stack } = err;

	console.log(err);

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

const handleDuplicateMongoDB = (err: CustomError) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new CustomError(message, 400);
};
const handleCastErrorDB = (err: CustomError) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new CustomError(message, 400);
};

const handleValidationErrorDB = (err: CustomError) => {
	const errors = Object.values(err.errors).map((el: any) => el.message);

	const message = `Invalid input data. ${errors.join('. ')}`;
	return new CustomError(message, 400);
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
	let error = { ...err };
	if (err.code === 11000) {
		error = handleDuplicateMongoDB(err);
	}
	if (err.name === 'CastError') error = handleCastErrorDB(error);
	if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

	if (process.env.SERVER_MODE === 'development') {
		sendErrorDev(error, res);
	}

	if (process.env.SERVER_MODE === 'production') {
		sendErrorProd(error, res);
	}
};

export { globalErrorMiddleware, notFound };
