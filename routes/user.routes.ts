import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';

const userRouter = Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);

export default userRouter;
