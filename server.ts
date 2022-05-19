import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Routes

import userRouter from './routes/user.routes';

dotenv.config({ path: './config/.env' });

const app: Application = express();

if (process.env.SERVER_MODE === 'development') {
	app.use(morgan('dev'));
}

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.use('/api/v1/users', userRouter);

app.listen(SERVER_PORT, () => {
	console.log(`Server is listening at port : {${SERVER_PORT}}`);
});
