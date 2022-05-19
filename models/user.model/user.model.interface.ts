import { Document } from 'mongoose';

interface IUser extends Document {
	email: string;
	password: string | undefined;
	passwordConfirm: string;
}

export default IUser;
