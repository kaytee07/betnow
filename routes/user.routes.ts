import {Router} from 'express';
import { UserController } from '../controllers';

const router = Router();

router.get("/signup", UserController.createUser);