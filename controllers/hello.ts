import { Request, Response } from "express";

class HelloController{
    static async hello(req: Request, res: Response) {
        return res.status(200).json("Hello World, Welcome to my API");
     }
}

export default HelloController;