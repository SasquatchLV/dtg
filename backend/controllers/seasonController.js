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
        console.log(season)
        res.status(200).json(season)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// end the season and save data in seasonDB
const finishSeason = async (req, res) => {
    const teamIdArray = await Team.distinct('_id')
    // const userIdArray = await User.distinct('_id')
    const matchIdArray = await Match.distinct('_id')

    let teams = []
    let matches = []
    // let users = []

    for (let i = 0; i < teamIdArray.length; i += 1) {
        const team = await Team.findOne({ _id: teamIdArray[i] })
        teams.push(team)
    }

    // for (let i = 0; i < userIdArray.length; i += 1) {
    //     const user = await User.findOne({ _id: userIdArray[i] })
    //     users.push(user)
    // }

    for (let i = 0; i < matchIdArray.length; i += 1) {
        const match = await Match.findOne({ _id: matchIdArray[i] })
        matches.push(match)
    }

    try {
        const activeSeason = await Season.findOne({ status: 'active' })
        console.log(activeSeason)
        activeSeason.status = 'finished'
        activeSeason.teams = teams
        activeSeason.matches = matches
        // activeSeason.users = users

        activeSeason.save()

        await Match.deleteMany({})
        await Team.deleteMany({})

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
