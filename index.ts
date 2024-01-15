import express, {Request, Response} from 'express';
const bodyParser = require('body-parser');
import mongooseClient from "./utils/mongoose";
import redisClient from "./utils/redis";
import { userRouter, helloRouter, authRouter, paymentRouter } from "./routes";
import cors from "cors";
import ticketRouter from "./routes/ticket.routes";
import session from "express-session"
import cookieParser from 'cookie-parser';

const PORT = 5000;
const app = express();

//middlewares
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// app.use(session({
//     secret: process.env.SESSION_SECRET || 'hjebjifeunrfnkjhj',
//     resave: false,
//     saveUninitialized: true,
// }));

//endpoints


app.get('/', (req: Request, res: Response) => {
  // Retrieve the value of the 'jwt' cookie
  const jwtCookieValue = req.cookies;

  // Do something with the cookie value
  console.log('Value of jwt cookie:', jwtCookieValue);

  res.send('JWT cookie retrieved from backend!');
});

app.use("/api", helloRouter);
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", ticketRouter);
app.use("/api", paymentRouter);

app.get("/hello", (req: Request, res: Response) => {
    res.cookie('authToken', "yoooooo", {httpOnly: true, secure: false});
    return res.json({"set": "set"})
});

app.listen(PORT, async () => {
    console.log(`Server started on ${PORT}`);
    console.log(await mongooseClient.isAlive());
    console.log(await redisClient.isAlive())
})