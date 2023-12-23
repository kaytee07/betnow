const express = require('express');
const bodyParser = require('body-parser');
import mongooseClient from "./utils/mongoose";
import redisClient from "./utils/redis";

const PORT = 5000;
const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//endpoints

app.listen(PORT, async () => {
    console.log(`Server started on ${PORT}`);
    console.log(await mongooseClient.isAlive());
    console.log(await redisClient.isAlive())
})