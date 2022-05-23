import { Document } from 'mongoose';
import IBankAccount from '../account.bank.model/account.bank.interface';

interface IUserMethods {
	comparePasswords: (password: string, candidatePassword: string) => boolean;
}

interface IUser extends Document, IUserMethods {
	email: string;
	password: string;
	passwordConfirm: string | undefined;
	bankAccount: IBankAccount;
}

export default IUser;
