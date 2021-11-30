import Player from "../models/players.js";

export const inreasePlayerMoney = async (req, res) => {
  let playerId;
  try {
    playerId = Object.keys(req.body)[0];

    await Player.findOneAndUpdate(
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
    await Player.findOneAndUpdate(
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

export const calculatePoolMoney = async (req, res) => {
  let moneyPool = null;
  let moneyToBeDistributed = [];
  // FIXME: Küsuratlı sayılar havuzda toplanıp sonraki haftaya eklenebilir veya olduğu gibi kalabilir. ????
  // let residualNumber = null;

  const players = await Player.find();
  players.sort((a, b) => b.dailyDiff - a.dailyDiff);

  players.forEach((el) => {
    moneyPool += el.money * 0.02;
  });

  let moneyOfFirstPlayer = moneyPool * 0.2;
  let moneyOfSecondPlayer = moneyPool * 0.15;
  let moneyOfThirdPlayer = moneyPool * 0.1;
  let moneyOfOtherPlayers = (moneyPool * 0.55) / (players.length - 3);

  moneyToBeDistributed.push(moneyOfFirstPlayer);
  moneyToBeDistributed.push(moneyOfSecondPlayer);
  moneyToBeDistributed.push(moneyOfThirdPlayer);
  for (let i = 3; i < players.length; i++) {
    moneyToBeDistributed.push(moneyOfOtherPlayers);
  }
};

export const payPlayerMoney = async (moneyOfPlayers, playerList) => {
  for (let i = 0; i < playerList.length; i++) {
    await Player.findOneAndUpdate(
      { _id: playerList[i]._id },
      { $inc: { money: moneyOfPlayers[i] } },
      { new: true }
    );
  }
};

calculatePoolMoney();

export const weeklyTimer = async (req, res) => {
  let today = new Date();
  let nextMonday = new Date();
  let monday = 1;

  nextMonday.setDate(today.getDate() + ((1 + today.getDay() + 7) % 7) + 1);
  nextMonday.setHours(12, 0, 0, 0);
  console.log("nextMonday");
  console.log(nextMonday);
  var currentTime = today.getTime();
  var aTime = nextMonday.getTime();

  console.log(currentTime);
  console.log(aTime);

  // console.log(nextMonday);
  // if (redisClient.connected) {
  //   console.log(redisClient.get());
  // }
};

weeklyTimer();
