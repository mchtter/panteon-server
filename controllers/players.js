import Player from "../models/players.js";
import redis from "redis";

var redisClient = redis.createClient();

export const getPlayers = async (req, res) => {
  try {
    if (redisClient.connected) {
      console.log("veriler redisten gelecek");
      redisClient.keys("User*", async (err, keys) => {
        if (keys.length > 0) {
          let players = [];
          for (var i = 0; i < keys.length; i++) {
            redisClient.get(keys[i], (err, obj) => {
              players.push(JSON.parse(obj));

              if (players.length == keys.length - 1) {
                res.status(200).json(players);
              }
            });
          }
        } else {
          console.log("redis de veri yok");
          const players = await Player.find();
          players.sort((a, b) => b.dailyDiff - a.dailyDiff);
          res.status(200).json(players);
        }
      });
    } else {
      // const players = await Player.find();
      // players.sort((a, b) => b.dailyDiff - a.dailyDiff)
      // res.status(200).json(players)
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const createFakeData = async (req, res) => {
  for (var i = 1; i <= 100; i++) {
    Player({
      country: "Turkey",
      username: `User-${i}`,
      rank: Math.floor(Math.random() * 10),
      money: Math.floor(Math.random() * 10000),
      dailyDiff: 0,
      weeklyDiff: 0,
    }).save();
  }
};
