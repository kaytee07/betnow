import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MySessionData } from '../utils/SessionType';
require('dotenv').config();


const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const sessionData: MySessionData = req.session as MySessionData; 
    const token = sessionData.accessToken;
    console.log(sessionData);
    if (token) {
        if (process.env.JWT_TOKEN){
            jwt.verify(token, process.env.JWT_TOKEN, (error: any, _decodedToken: any) => {
                if (error) {
                    return res.status(401).json({ error: 'Invalid token' });
                } else {
                    next();
                }
            });
        } else {
            console.error('JWT TOKEN NOT AVAILABLE')
        }
    }  else {
        return res.status(401).json({"error": "No token provided"})
    }
    
};

export default requireAuth;