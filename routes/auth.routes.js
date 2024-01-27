import {Router} from 'express';
import AuthController from '../controllers/authentication.controller.js';
//import { requireAuth } from '../middlewares';

const authRouter = Router();

authRouter.post("/login", AuthController.login); 
authRouter.post("/logout", AuthController.logout);

export default authRouter;