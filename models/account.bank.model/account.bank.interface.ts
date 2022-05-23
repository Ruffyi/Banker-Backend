import { Document } from 'mongoose';

interface IBankAccount extends Document {
	balance: number;
	deposit: any;
}

export default IBankAccount;
