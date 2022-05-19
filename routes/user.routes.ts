import { Router } from 'express';
import { signup } from '../controllers/auth.controller';

const userRouter = Router();

userRouter.route('/signup').post(signup);

export default userRouter;
