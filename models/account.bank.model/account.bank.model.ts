import { Schema, model } from 'mongoose';

import IBankAccount from './account.bank.interface';

const bankAccountSchema = new Schema<IBankAccount>({
	balance: {
		type: Number,
		default: 10000,
	},
	deposit: [
		{
			name: {
				type: String,
				required: [true, 'Deposit must have a name'],
			},
			value: {
				type: Number,
				required: [true, 'Deposit must be a number'],
			},
		},
	],
});

const BankAccount = model('BankAccount', bankAccountSchema);

export { bankAccountSchema };

export default BankAccount;
