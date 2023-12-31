import Joi from "joi";
import { UserModel } from "../models";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
require('dotenv').config();
const jwt = require('jsonwebtoken');


class AuthController {
    static async login (req: Request, res: Response) {
        const userSchema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required()
        })

        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({"Error": error});
        } 

        const { email, password } = value;

        try {
            let user = await UserModel.findOne({"email": email});
            if (!user) {
                return res.status(400).json({'error': 'Email cannot be found'});
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = await jwt.sign(
            { userId: user._id, email: user.email}, 
            process.env.JWT_TOKEN, { expiresIn: '1h'}
            );

            res.cookie("token", token, { httpOnly: true});
            
            return res.status(200).json({"success": user, "token": token});
        } catch (err) {
            return res.status(401).json({"Error": err});
        } 

    }

    static async logout(req: Request, res:Response) {
        res.clearCookie('token', {httpOnly: true});
        console.log(req.cookies)
        res.status(200).json({"message": "logout successfully"});
    }

}

export default AuthController;