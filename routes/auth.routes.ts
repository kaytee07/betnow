import {Router} from 'express';
import { AuthController } from '../controllers';
import { requireAuth } from '../middlewares';

const authRouter = Router();

authRouter.get("/login", AuthController.login); 
authRouter.post("/logout", AuthController.logout);

export default authRouter;