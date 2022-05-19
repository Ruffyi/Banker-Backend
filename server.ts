import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const app: Application = express();

if (process.env.SERVER_MODE === 'development') {
	app.use(morgan('dev'));
}

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.get('/', (req, res) => {
	res.send({
		message: 'Hi!',
	});
});

app.listen(SERVER_PORT, () => {
	console.log(`Server is listening at port : {${SERVER_PORT}}`);
});
