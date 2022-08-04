const Team = require("../models/teamModel")
const mongoose = require("mongoose")

// get all workouts
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
    if (!teams) return res.status(204).json({ error: "No teams found" })

    // Sort teams by points
    const sortedTeams = teams.sort((a, b) => {
      return b.points - a.points
    }
    )
    res.status(200).json(sortedTeams)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// add new team
const addNewTeam = async (req, res) => {
  const { country, flag, group } = req.body

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

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please provide more details", emptyFields })
  }

  try {
    const team = await Team.create({ country, flag, group })
    res.status(200).json(team)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a team
const removeTeam = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such team exists in db" })
  }

  const team = await Team.findOne({ _id: id })

  if (!team) {
    return res.status(400).json({ error: "No such team exists in db" })
  }

  try {
    await Team.deleteOne({ _id: id })

    res.status(200).json({ message: `Team ${team.country} deleted successfully!` })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAllTeams,
  addNewTeam,
  removeTeam,
}
