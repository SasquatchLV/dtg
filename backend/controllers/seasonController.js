const Season = require("../models/seasonModel")
const Team = require("../models/teamModel")
const User = require("../models/userModel")
const Match = require("../models/matchModel")

// end the season and save data in seasonDB
const endSeason = async (req, res) => {
    const { year } = req.body

    const teamIdArray = await Team.distinct('_id')
    const userIdArray = await User.distinct('_id')
    const matchIdArray = await Match.distinct('_id')

    let teams = []
    let matches = []
    let users = []

    for (let i = 0; i < teamIdArray.length; i += 1) {
        const team = await Team.findOne({ _id: teamIdArray[i] })
        teams.push(team)
    }

    for (let i = 0; i < userIdArray.length; i += 1) {
        const user = await User.findOne({ _id: userIdArray[i] })
        users.push(user)
    }

    for (let i = 0; i < matchIdArray.length; i += 1) {
        const match = await Match.findOne({ _id: matchIdArray[i] })
        matches.push(match)
    }

    try {
        const season = await Season.create({ year, teams, matches, users })

        await Match.deleteMany({})
        await Team.deleteMany({})

        res.status(200).json(season)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    endSeason
}
