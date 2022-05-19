import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model/user.model';
import IUser from '../models/user.model/user.model.interface';
import JWT from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config({ path: './../config/.env' });

const signToken = (id: string) => {
	return JWT.sign({ id }, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createAndSendToken = (user: IUser, statusCode: number, res: Response) => {
	const token = signToken(user._id);

	const cookieExpires = Number(process.env.JWT_COOKIE_EXPIRES_IN);

	const cookieOptions = {
		expires: new Date(Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
		secure: false,
		httpOnly: true,
	};

	if (process.env.SERVER_MODE === 'production') {
		cookieOptions.secure = true;
	}

	res.cookie('jwt', token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).send({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

const signup = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password, passwordConfirm } = req.body;

		const newUser = await User.create({
			email,
			password,
			passwordConfirm,
		});

		createAndSendToken(newUser, 201, res);
	}
);

export { signup };
