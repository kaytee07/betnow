import {Router} from 'express';
import { AuthController } from '../controllers';

const router = Router();

router.get("/login", AuthController.login);