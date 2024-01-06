const express = require('express');
const bodyParser = require('body-parser');
import mongooseClient from "./utils/mongoose";
import redisClient from "./utils/redis";
import { userRouter, helloRouter } from "./routes";

const PORT = 5000;
const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//endpoints

app.use("/api", helloRouter);

app.use("/api", userRouter);

app.get("/hello", (req: Request, res: Response) => {
    console.log("dog");
});

app.listen(PORT, async () => {
    console.log(`Server started on ${PORT}`);
    console.log(await mongooseClient.isAlive());
    console.log(await redisClient.isAlive())
})