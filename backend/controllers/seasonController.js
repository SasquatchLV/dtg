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

// start a new season with status: 'active'
const startNewSeason = async (req, res) => {

    const { seasonsYear, selectedTeams } = req.body

    selectedTeams.forEach(({ flag, country, group }) => Team.create({ flag, country, group }))

    try {
        const season = await Season.create({ year: Number(seasonsYear), status: 'active' })
        res.status(200).json(season)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// end the season and save data in seasonDB
const finishSeason = async (req, res) => {
    try {
        const [seasonTeams, seasonMatches, users, activeSeason] = await Promise.all([
            Team.find(),
            Match.find(),
            User.find(),
            Season.findOne({ status: 'active' })
        ])
        
        const topThreeUsersInPoints = users.sort((a, b) => b.points - a.points).slice(0, 3)

        activeSeason.status = 'finished'
        activeSeason.teams = seasonTeams
        activeSeason.matches = seasonMatches
        activeSeason.users = topThreeUsersInPoints

        // resets db for next season
        await Promise.all([
            ...users.map((user) => User.updateOne({ "_id": user._id }, { "points": 0 })), 
            Match.deleteMany({}), 
            Team.deleteMany({}),
            activeSeason.save()
        ])

        res.status(200).json(activeSeason)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get teams for selection
const getPreviousSeasonTeams = async (req, res) => {
    try {
        const seasons = await Season.find()
        const seasonTeams = seasons.flatMap((season) => season.teams)
        const uniqueTeams = [...new Map(seasonTeams.map((team) => [team.country, team])).values()]

        res.status(200).json(uniqueTeams)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    finishSeason, getAllSeasons, getSingleSeason, getPreviousSeasonTeams, startNewSeason,
}
