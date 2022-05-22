import IUser from '../../models/user.model/user.model.interface';

declare global {
	namespace Express {
		interface Request {
			user: IUser;
		}
	}
}
