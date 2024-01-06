import { Request, Response } from 'express'
import { UserModel } from '../models'
import bcrypt from 'bcrypt'
import Joi from 'joi'

class UserController {
    static async hello(req: Request, res: Response) {
        return res.status(200).json("Hello World, Welcome to my API");
     }

    static async hashPassword (password: string) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    static async createUser( req: Request, res:Response) {
        console.log(req.body);
        const userSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required()
        })

        const { error, value } = userSchema.validate(req.body);

        if (error) res.status(400).json({"error": error});

        const { firstName, lastName, email, username, password} = value;
        const hashedPassword = await UserController.hashPassword(password);
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        user.save()
        .then(()=> {
            console.log(`${user.firstName}`)
            res.status(200).json(user);
        }).catch((error) => {
            console.error(error);
        })
    }

}

export default UserController;

