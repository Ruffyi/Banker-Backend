import { Request, Response } from 'express';

const signup = (req: Request, res: Response) => {
	res.status(200).send({
		message: 'Hi',
	});
};

export { signup };
