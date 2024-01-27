import Joi from "joi";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from 'jsonwebtoken';
config()



class AuthController {
    static async login (req, res) {
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
                return res.status(400).json({message: 'Email cannot be found'});
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }


            if (process.env.JWT_TOKEN) {
                let token = jwt.sign({ userId: user._id, email: user.email}, process.env.JWT_TOKEN, { expiresIn: '1h'});
                res.cookie('jwt', token, {httpOnly: true, sameSite:"lax"});
                console.log(token)
                console.log(req.cookies.jwt);
                console.log("we made it here")
                return res.send('https://www.bettnow.org/api/home');
            } else {
                console.error('JWT_TOKEN is not defined in environment variables.');
            }
            

            
        } catch (err) {
            return res.status(401).json({"Error": err});
        } 

    }

   static async logout(req, res) {
        res.clearCookie('jwt', { httpOnly: true });
        res.status(200).json({ "message": "logout successfully" });
    }


}

export default AuthController;