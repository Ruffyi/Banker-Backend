import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const app: Application = express();

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.listen(SERVER_PORT, () => {
	console.log(`Server is listening at port : {${SERVER_PORT}}`);
});
