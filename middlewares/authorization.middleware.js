import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        if (process.env.JWT_TOKEN){
            jwt.verify(token, process.env.JWT_TOKEN, (error, _decodedToken) => {
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