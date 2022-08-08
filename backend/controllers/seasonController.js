const Season = require("../models/seasonModel")
const Team = require("../models/teamModel")
const User = require("../models/userModel")
const Match = require("../models/matchModel")

const getAllSeasons = async (req, res) => {
    try {
        const seasons = await Season.find()

        if (!seasons.length) {
            return res.status(404).json({
                error: 'No seasons registered',
            })
        }

        // Sort seasons by year
        seasons.sort((a, b) => a.year - b.year)

        res.status(200).json(seasons)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getSingleSeason = async (req, res) => {
    try {
        const { year } = req.params

        const season = await Season.findOne({ year })

        season.teams.sort((a, b) => b.points - a.points)

        res.status(200).json(season)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

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
        season.status = 'finished'
        await Match.deleteMany({})
        await Team.deleteMany({})

        res.status(200).json(season)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get teams for selection
const getPreviousSeasonTeams = async (req, res) => {    
    try {
        const seasons = await Season.find()
        const seasonTeams = [...new Set(seasons.flatMap((season) => season.teams))]

        res.status(200).json(seasonTeams)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    endSeason, getAllSeasons, getSingleSeason, getPreviousSeasonTeams,
}
