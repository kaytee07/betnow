import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();



const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies && req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_TOKEN, (error: string , decodedToken: string) => {
            if (error) {
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                next();
            }
        });
    }  else {
        return res.status(401).json({"error": "No token provided"})
    }
    
};

export default requireAuth;