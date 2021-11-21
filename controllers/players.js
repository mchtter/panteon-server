import Player from "../models/players.js";
import redis from "redis";

var redisClient = redis.createClient();

redisClient.on("connect", function () {
  console.log("Redis client connected");
});

redisClient.on("error", function (err) {
  console.log("Redis bağlantısı yapılamadı: " + err);
});

export const getPlayers = async (req, res) => {
  Player.find((err, doc) => {
    doc.forEach((item) => {
      let userName = "User:" + item._doc._id;

      redisClient.get(userName, (err, user) => {
        var data = JSON.stringify(item._doc);
        console.log(data);
        redisClient.set(userName, data, () => {});
      });
    });
  });
  // console.log(res);
  try {
    if (redisClient.connected) {
      // Redis bağlıysa
      redisClient.keys("User*", async (err, keys) => {
        if (keys.length > 0) {
          // Rediste veri varsa
          // Önce güncelle

          //Sonra Göster
          let players = [];
          for (var i = 0; i < keys.length; i++) {
            redisClient.get(keys[i], (err, obj) => {
              players.push(JSON.parse(obj));

              if (players.length == keys.length - 1) {
                players.sort((a, b) => b.dailyDiff - a.dailyDiff);
                res.status(200).json(players);
              }
            });
          }
        } else {
          // Rediste veri yoksa
          Player.find((err, doc) => {
            doc.forEach((item) => {
              let userName = "User:" + item._doc._id;

              redisClient.get(userName, (err, user) => {
                if (user == null) {
                  var data = JSON.stringify(item._doc);
                  redisClient.set(userName, data, () => {});
                }
              });
            });

            doc.sort((a, b) => b.dailyDiff - a.dailyDiff);
            res.status(200).json(doc);
          });
          // const players = await Player.find();
          // players.sort((a, b) => b.dailyDiff - a.dailyDiff);
          // res.status(200).json(players);
          // players.sort((a, b) => b.dailyDiff - a.dailyDiff);
          // res.status(200).json(players);
        }
      });
    } else {
      // Redis bağlı değilse
      const players = await Player.find();
      players.sort((a, b) => b.dailyDiff - a.dailyDiff);
      res.status(200).json(players);
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
  // weeklyAwards();
};

export const weeklyAwards = async (req, res) => {
  let today = new Date();
  let monday = today.getDay();
  // console.log(monday);
  // if (redisClient.connected) {
  //   console.log(redisClient.get());
  // }
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
