import Player from "../models/players.js";

export const inreasePlayerMoney = async (req, res) => {
  let playerId;
  try {
    playerId = Object.keys(req.body)[0];

    const update = await Player.findOneAndUpdate(
      { _id: playerId },
      { $inc: { money: 100 } },
      { new: true }
    );
    // const player = await Player.findById(playerId);
    // console.log(update);
  } catch (error) {}
};

export const decreasePlayerMoney = async (req, res) => {
  let playerId;
  try {
    playerId = Object.keys(req.body)[0];
    const update = await Player.findOneAndUpdate(
      { _id: playerId },
      { $inc: { money: -100 } },
      { new: true }
    );
    // console.log(update);
    // console.log(req.body)
    // console.log(req.params.id)
    // console.log(req)
    // const player = await Player.findById(req.params.id);
  } catch (error) {}
};
