const Team = require('../models/teamModel')
const TeamSelection = require('../models/teamSelectionModel')

class TeamsService {
    // get all teams
    static async getTeams() {
        const teams = await Team.find()

        if (!teams) throw new Error("No teams found")

        // Sort teams by points
        const sortedTeams = teams.sort((a, b) => b.points - a.points)

        return {
            teams: sortedTeams
        }
    }

    // get team selection
    static async getTeamSelection() {
        const teamSelection = await TeamSelection.find()

        return { teamSelection }
    }

    // add team to selection
    static async addTeamToSelection({ countryName, countryFlag }) {
        await TeamSelection.create({ country: countryName, flag: countryFlag })
    }

    // add new team
    static async addTeam({ country, flag, group }) {
    let emptyFields = []

    if (!country) {
        emptyFields.push("country")
    }

    if (!flag) {
        emptyFields.push("flag")
    }

    if (!group) {
        emptyFields.push("group")
    }

    if (emptyFields.length) {
        throw new Error('Missing fields')
    }


    await Team.create({ country, flag, group })
}

    // delete a team
    static async removeTeam({ _id }) {
    const team = await Team.findOne({ _id })
    if (!team) {
        throw new Error("No such team exists in db")
    }

    await Team.deleteOne({ _id })
}
}

module.exports = TeamsService;