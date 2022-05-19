import { Schema, Model, model } from 'mongoose';
import validator from 'validator';
import IUser from './user.model.interface';

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
});

const User: Model<IUser> = model('User', userSchema);

export default User;
