const Team = require("../models/teamModel")
const mongoose = require("mongoose")

// get all workouts
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
    if (!teams) return res.status(204).json({ message: "No teams found" })
    res.status(200).json(teams)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// add new team
const addNewTeam = async (req, res) => {
  const { country, flag } = req.body

  let emptyFields = []

  if (!country) {
    emptyFields.push("country")
  }
  if (!flag) {
    emptyFields.push("flag")
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please provide more details", emptyFields })
  }

  try {
    const team = await Team.create({ country, flag })
    res.status(200).json(team)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const removeTeam = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such team exists in db" })
  }

  const team = await Team.findOneAndDelete({ _id: id })

  if (!team) {
    return res.status(400).json({ error: "No such team exists in db" })
  }

  res.status(200).json(team)
}

module.exports = {
  getAllTeams,
  addNewTeam,
  removeTeam,
}
