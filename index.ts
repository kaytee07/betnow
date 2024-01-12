const express = require('express');
const bodyParser = require('body-parser');
import mongooseClient from "./utils/mongoose";
import redisClient from "./utils/redis";
import { userRouter, helloRouter, authRouter } from "./routes";
import cors from "cors";
import { allow, any } from "joi";
import ticketRouter from "./routes/ticket.routes";
import session from "express-session"
import cookieParser from 'cookie-parser';

const PORT = 5000;
const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(cors({
    origin: "*",
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'hjebjifeunrfnkjhj',
    resave: false,
    saveUninitialized: true,
}));

//endpoints

app.use("/api", helloRouter);
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", ticketRouter);

app.get("/hello", (req: Request, res: Response) => {
    console.log("dog");
});

app.listen(PORT, async () => {
    console.log(`Server started on ${PORT}`);
    console.log(await mongooseClient.isAlive());
    console.log(await redisClient.isAlive())
})