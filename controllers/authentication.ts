import Joi from "joi";
import { UserModel } from "../models";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

class AuthController {
    static async login (req: Request, res: Response) {
        const userSchema = Joi.object({
            email: Joi.string().required().email,
            password: Joi.string().required()
        })

        const { error, value } = userSchema.validate(req.body);
        if (error) res.status(400).json({"Error": error});

        const { email, password } = value;

        const user = await UserModel.find(email);

        if (!user) res.status(400).json({'error': 'Email cannot be found'});

        res.json({user});


        

    }

    static async logout() {

    }

}

export default AuthController;