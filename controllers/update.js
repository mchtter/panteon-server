import Player from "../models/players.js";
// import redisClient from "../index.js";
// import redis from "redis";

// var redisClient = redis.createClient();

export const inreasePlayerDiff = async (req, res) => {
  let playerId;
  req.body.dailyDiff += 1;
  req.body.weeklyDiff += 1;
  console.log(req.body);

  try {
    playerId = req.body._id;

    const player = await Player.findOneAndUpdate({ _id: playerId }, req.body, {
      new: true,
    });

    // Update Redis
    console.log("redis bağlı güncellenecek 1");
    if (redisClient.connected) {
      console.log("redis bağlı güncellenecek 2");
      var userName = "User:" + playerId;
      var data = JSON.stringify(newPlayerData);
      redisClient.set(userName, data, (err, res) => {});
    }
    await Player.findById(playerId);
    console.log(update);
  } catch (error) {
    console.log(error);
  }
};

export const decreasePlayerDiff = async (req, res) => {
  let playerId;
  try {
    playerId = Object.keys(req.body)[0];
    const update = await Player.findOneAndUpdate(
      { _id: playerId },
      { $inc: { dailyDiff: -1, weeklyDiff: -1 } },
      { new: true }
    );
    console.log(update);
    // console.log(req.body)
    // console.log(req.params.id)
    // console.log(req)
    // const player = await Player.findById(req.params.id);
  } catch (error) {}
};
