const Team = require('../models/teamModel')

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
}

module.exports = TeamsService;