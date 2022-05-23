import { Schema, Model, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import IUser from './user.model.interface';
import BankAccount from '../account.bank.model/account.bank.model';

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		required: [true, 'Provide a email address!'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Provide a valid email address!'],
	},
	password: {
		type: String,
		minlength: 6,
		trim: true,
		required: [true, 'Provide a password!'],
	},
	passwordConfirm: {
		type: String,
		minlength: 6,
		trim: true,
		required: [true, 'Confirm a password!'],
		validate: {
			validator: function (this: IUser, password: string) {
				return this.password === password;
			},
			message: 'Passwords must be the same!',
		},
	},
	bankAccount: {
		type: Schema.Types.ObjectId,
		ref: 'bankAccount',
	},
});

userSchema.pre<IUser>(/^find/, function () {
	this.populate({
		path: 'bankAccount',
		model: BankAccount,
	});
});

userSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.comparePasswords = async function (
	password: string,
	candidatePassword: string
) {
	return await bcrypt.compare(password, candidatePassword);
};

const User: Model<IUser> = model('User', userSchema);

export default User;
