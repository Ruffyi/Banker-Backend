import { Document } from 'mongoose';

interface IUser extends Document {
	email: string;
	password: string;
	passwordConfirm: string;
}

export default IUser;