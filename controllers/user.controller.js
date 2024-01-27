import UserModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import Joi from 'joi'

class UserController {
    static async hello(req, res) {
        if(req.cookies.jwt){
        console.log(req.cookies)
        return res.status(200).json({success: "ok"});
       } else {
        return res.status(400).json({error: "user not logged in"})
       }
     }

    static async hashPassword (password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    static async createUser( req, res) {
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
            return res.status(200).json({firstName, lastName, email});
        }).catch((error) => {
            console.error(error);
        })
    }

    static async getAllUsers(req, res) {
        try {
            const numOfUsers = await UserModel.find()
            return res.status(200).json({"number_of_users": numOfUsers})
        } catch (err) {
            res.status(400).json({"Error": err})
        }
        
    }

    static async deleteUser(req, res) {
        const { email } = req.body;
        try {
            const user = await UserModel.deleteOne({email});
            return res.status(200).json({"sucessful": `deleted ${user}`})
        } catch (err) {
            return res.status(400).json({"Error": err});
        }
        
    }

    static async getUser(req, res) {
        const { email } = req.body;
        try {
            const user = await UserModel.findOne({email});
            return res.status(200).json({"sucessful": `${user}`})
        } catch (err) {
            return res.status(400).json({"Error": err});
        }
    }

    static async getNumberOfUsers(req, res) {
        try {
            const numOfUsers = await UserModel.countDocuments({});
            return res.status(200).json({"sucessful": numOfUsers});
        } catch (err) {
            return res.status(400).json({"Error": err});
        }
    }

}

export default UserController;

