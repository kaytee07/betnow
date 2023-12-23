import { Request, Response } from 'express'
import { UserModel } from '../models'
import bcrypt from 'bcrypt'
import Joi from 'joi'

class User {
    static async hashPassword (password: String) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    static async createUser( req: Request, res:Response) {
        const userSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            username: Joi.string().required,
            email: Joi.string().required().email(),
            password: Joi.string().required()
        })

        const { error, value } = userSchema.validate(req.body);

        if (error) res.status(400).json({"error": error});

        const { firstName, lastName, email, username, password} = value;
        const hashedPassword = await User.hashPassword(password);
        const user = new UserModel({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        })

        user.save()
        .then(()=> {
            console.log(`${user.username}`)
        }).catch((error) => {
            console.error(error);
        })

        res.status(200).json(user);
    }
}