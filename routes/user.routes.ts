import express from 'express';
import { UserController } from '../controllers';

const UserRouter = express.Router();

UserRouter.post("/signup", UserController.createUser);

export default UserRouter;