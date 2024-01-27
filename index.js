import bodyParser from 'body-parser';
import express from "express"
import mongooseClient from "./utils/mongoose.js";
import redisClient from "./utils/redis.js";
import { userRouter, helloRouter, authRouter, paymentRouter } from "./routes/index.js";
import cors from "cors";
import ticketRouter from "./routes/ticket.routes.js";
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

app.use(session({
    secret: process.env.SESSION_SECRET || 'hjebjifeunrfnkjhj',
    resave: false,
    saveUninitialized: true,
}));

//endpoints
app.get("/", (req, res) => {
    console.log(req.cookies.jwt)
})



app.use("/api", helloRouter);
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", ticketRouter);
app.use("/api", paymentRouter);


app.listen(PORT, async () => {
    console.log(`Server started on ${PORT}`);
    console.log(await mongooseClient.isAlive());
    console.log(await redisClient.isAlive())
})