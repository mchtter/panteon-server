import Player from '../models/players.js';


export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        players.sort((a, b) => b.dailyDiff - a.dailyDiff)
        res.status(200).json(players)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createFakeData = async (req, res) => {

    for (var i = 1; i < 1000; i++) {
        Player({country: "Turkey", username: `User${i}`, rank: Math.floor(Math.random() * 10), money: Math.floor(Math.random() * 10000), dailyDiff: 0}).save()
    }

}

