import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import playerRoutes from "./routes/players.js";
import changeRoutes from "./routes/update.js";
import updateMoney from "./routes/money.js";
import redis from "redis";
import { calculatePoolMoney } from "./controllers/money.js";
import cron from "cron";

export const cronTimer = new cron.CronJob('0 * * * * *', () => { 
  console.log("cron job");

calculatePoolMoney()

})

cronTimer.start();


// Redis Client

export const redisClient = redis.createClient({
  host: 'redis-11803.c55.eu-central-1-1.ec2.cloud.redislabs.com', // The redis's server ip 
  port: '11803',
  password: 'ZPXTiUWiz7CiZFlwJR0I7CrXJ8LW8TkO'
  });

redisClient.on("connect", function () {
  console.log("Redis client connected");
});


redisClient.on("error", function (err) {
  console.log("Something went wrong " + err);
});

const app = express(); // create express app
dotenv.config(); // load env variables

app.use(bodyParser.json({ limit: "30mb", extended: true })); // parse json data 30mb > limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // parse urlencoded data 30mb > limit
app.use(cors()); // enable cors

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/players", playerRoutes);
app.use("/update", changeRoutes);
app.use("/money", updateMoney);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  }); // connect to database
