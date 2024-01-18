import express from "express";
import { UserController } from "../controllers";

const helloRouter = express.Router();


helloRouter.get("/auth", UserController.hello);

export default helloRouter;