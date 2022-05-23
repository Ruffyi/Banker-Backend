import { Router } from 'express';
import { signup, login, protect } from '../controllers/auth.controller';
import { getAllUsers, getUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/').get(getAllUsers);
userRouter.route('/:id').get(getUser);

export default userRouter;
