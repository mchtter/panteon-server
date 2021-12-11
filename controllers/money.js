import Player from "../models/players.js";

export const inreasePlayerMoney = async (req, res) => {
  let playerId = req.body._id;
  req.body.money += 100;

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

export const decreasePlayerMoney = async (req, res) => {
  let playerId = req.body._id;
  req.body.money -= 100;

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

export const calculatePoolMoney = async (req, res) => {
  console.log("çalıştı")
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

  payPlayerMoney(moneyToBeDistributed, players);
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