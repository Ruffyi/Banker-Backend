import { connect } from 'mongoose';

import dotenv from 'dotenv';

dotenv.config({ path: './../config/.env' });

const connectToMongoDB = async () => {
	try {
		const DB = process.env.DB_URL;
		await connect(
			DB?.replace('<PASSWORD>', process.env.DB_PASSWORD as string) as string
		);
		console.log('Connect with DB : ✔');
	} catch (err) {
		console.log('Something goes wrong :/');
		return err;
	}
};

export default connectToMongoDB;
