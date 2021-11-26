import Player from "../models/players.js";
import { redisClient } from "../app.js";

export const inreasePlayerDiff = async (req, res) => {
  let playerId = req.body._id;
  req.body.dailyDiff += 1;
  req.body.weeklyDiff += 1;

  try {
    // Update Database
    await Player.findOneAndUpdate({ _id: playerId }, req.body, {
      new: true,
    });

    // Update Redis
    if (redisClient.connected) {
      var userName = "User:" + playerId;
      var data = JSON.stringify(req.body);
      redisClient.set(userName, data, (err, res) => {});
    }
  } catch (error) {
    console.log(error);
  }
};

export const decreasePlayerDiff = async (req, res) => {
  let playerId = req.body._id;
  req.body.dailyDiff -= 1;
  req.body.weeklyDiff -= 1;

  try {
    // Update Database
    await Player.findOneAndUpdate({ _id: playerId }, req.body, {
      new: true,
    });

    // Update Redis
    if (redisClient.connected) {
      var userName = "User:" + playerId;
      var data = JSON.stringify(req.body);
      redisClient.set(userName, data, (err, res) => {});
    }
  } catch (error) {
    console.log(error);
  }
};
