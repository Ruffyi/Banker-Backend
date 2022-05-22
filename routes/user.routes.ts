import { Router } from 'express';
import { signup, login, protect } from '../controllers/auth.controller';

const userRouter = Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/get').get(protect, (req, res) => {
	res.send({
		message: 'Success',
	});
});

export default userRouter;
