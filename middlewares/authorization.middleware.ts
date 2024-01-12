import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MySessionData } from '../utils/SessionType';
require('dotenv').config();


const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(" ")[1];
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