import express from 'express';
import { UserController } from '../controllers';

const UserRouter = express.Router();

UserRouter.post("/signup", UserController.createUser);
UserRouter.get("/allusers", UserController.getAllUsers);
UserRouter.get("/user", UserController.getUser);
UserRouter.post("/removeuser", UserController.deleteUser);
UserRouter.get("/numberofusers", UserController.getNumberOfUsers);

export default UserRouter;