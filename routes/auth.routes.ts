import {Router} from 'express';
import { AuthController } from '../controllers';

const authRouter = Router();

authRouter.get("/login", AuthController.login); 

export default authRouter;