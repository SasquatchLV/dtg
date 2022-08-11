const Season = require("../models/seasonModel")
const Team = require("../models/teamModel")
const User = require("../models/userModel")
const Match = require("../models/matchModel")

class SeasonService {
    // get all seasons
    static async getSeasons() {
        const seasons = await Season.find()

        if (!seasons.length) {
            throw new Error('No seasons registered')
        }

        // Sort seasons by year
        seasons.sort((a, b) => a.year - b.year)

        return { seasons }
    }

    // get one season
    static async getSeason({ year }) {
        const season = await Season.findOne({ year })

        season.teams.sort((a, b) => b.points - a.points)

        return { season }
    }

    // start a new season with status: 'active'
    static async startNewSeason({ seasonsYear, selectedTeams }) {
        selectedTeams.forEach(({ flag, country, group }) => Team.create({ flag, country, group }))

        await Season.create({ year: Number(seasonsYear), status: 'active' })
    }

    // end the season and save data in DB
    static async finishSeason() {
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
    }

    // get teams for selection
    static async getPreviousSeasonTeams() {
        const seasons = await Season.find()
        const seasonTeams = seasons.flatMap(({ teams }) => teams)
        const uniqueTeams = [...new Map(seasonTeams.map((team) => [team.country, team])).values()]

        return { uniqueTeams }
    }
}

module.exports = SeasonService;