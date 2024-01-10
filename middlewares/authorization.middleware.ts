// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// require('dotenv').config();



// const requireAuth = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies && req.cookies.token;
//     if (token) {
//         if (process.env.JWT_TOKEN){
//             jwt.verify(token, process.env.JWT_TOKEN, (error: jwt.VerifyErrors , _decodedToken: object) => {
//                 if (error) {
//                     return res.status(401).json({ error: 'Invalid token' });
//                 } else {
//                     next();
//                 }
//             });
//         } else {
//             console.error('JWT TOKEN NOT AVAILABLE')
//         }
//     }  else {
//         return res.status(401).json({"error": "No token provided"})
//     }
    
// };

// export default requireAuth;