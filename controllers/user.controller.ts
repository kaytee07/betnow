import { Request, Response } from 'express'
import { UserModel } from '../models'
import bcrypt from 'bcrypt'
import Joi from 'joi'

class UserController {
    static async hello(req: Request, res: Response) {
        console.log(req.cookies)
        if(req.cookies.jwt){
        return res.status(200).json({success: "ok"});
       } else {
        return res.status(400).json({error: "user not logged in"})
       }
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

        const { firstName, lastName, email, password} = value;

        try {
             const EmailInDB = await UserModel.findOne({email});
             if (EmailInDB) {
                return res.status(400).json({"error": "Email already exist"});
             }
        } catch(err) {
            res.status(400).json({"error": err})
        }
       
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
            return res.status(200).json({firstName, lastName, email});
        }).catch((error) => {
            console.error(error);
        })
    }

    static async getAllUsers(req: Request, res:Response) {
        try {
            const numOfUsers = await UserModel.find()
            return res.status(200).json({"number_of_users": numOfUsers})
        } catch (err) {
            res.status(400).json({"Error": err})
        }
        
    }

    static async deleteUser(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const user = await UserModel.deleteOne({email});
            console.log(user);
            return res.status(200).json({"sucessful": `deleted ${user}`})
        } catch (err) {
            return res.status(400).json({"Error": err});
        }
        
    }

    static async getUser(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const user = await UserModel.findOne({email});
            return res.status(200).json({"sucessful": `${user}`})
        } catch (err) {
            return res.status(400).json({"Error": err});
        }
    }

    static async getNumberOfUsers(req: Request, res: Response) {
        try {
            const numOfUsers = await UserModel.countDocuments({});
            return res.status(200).json({"sucessful": numOfUsers});
        } catch (err) {
            return res.status(400).json({"Error": err});
        }
    }

}

export default UserController;

