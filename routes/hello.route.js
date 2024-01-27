import express from "express";
import UserController from "../controllers/hello.controller.js";

const helloRouter = express.Router();


helloRouter.get("/auth", UserController.hello);

export default helloRouter;