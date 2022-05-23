import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model/user.model';
import expressAsyncHandler from 'express-async-handler';

const getAllUsers = expressAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const users = await User.find({});
		res.status(200).send({
			status: 'success',
			data: users,
		});
	}
);

const getUser = expressAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).send({
			status: 'success',
			data: user,
		});
	}
);

export { getAllUsers, getUser };
