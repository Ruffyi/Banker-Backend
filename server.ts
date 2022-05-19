import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connect';

// Routes

import userRouter from './routes/user.routes';

// Middlewares

import {
	globalErrorMiddleware,
	notFound,
} from './controllers/error.controller';

dotenv.config({ path: './config/.env' });

connectToMongoDB();

const app: Application = express();

if (process.env.SERVER_MODE === 'development') {
	app.use(morgan('dev'));
}

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.use('/api/v1/users', userRouter);

app.all('*', notFound);

app.use(globalErrorMiddleware);

app.listen(SERVER_PORT, () => {
	console.log(`Server is listening at port : {${SERVER_PORT}}`);
});
