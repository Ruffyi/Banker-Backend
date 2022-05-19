import { Document } from 'mongoose';

interface IUserMethods {
	comparePasswords: (password: string, candidatePassword: string) => boolean;
}

interface IUser extends Document, IUserMethods {
	email: string;
	password: string;
	passwordConfirm: string | undefined;
}

export default IUser;
