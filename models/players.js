import mongoose from "mongoose";

const playerSchema = mongoose.Schema(
  {
    country: String,
    username: String,
    rank: Number,
    money: Number,
    dailyDiff: Number,
    weeklyDiff: Number,
  },
  { collection: "" }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;
