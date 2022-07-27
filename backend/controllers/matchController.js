const Match = require("../models/matchModel")
const Team = require("../models/teamModel")
const mongoose = require("mongoose")

// get all matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()

    if (matches.length === 0) {
      return res.status(404).json({
        error: "No upcoming matches",
      })
    }

    res.status(200).json(matches)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// create new match
const createMatch = async (req, res) => {
  const { homeTeam, awayTeam, startingTime } = req.body

  let emptyFields = []

  if (!homeTeam) {
    emptyFields.push("Home Team")
  }
  if (!awayTeam) {
    emptyFields.push("Away Team")
  }
  if (!startingTime) {
    emptyFields.push("Date")
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields })
  }

  // add doc to db
  try {
    const match = await Match.create({ homeTeam, awayTeam, startingTime })
    res.status(200).json(match)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get user prediction
const makePrediction = async (req, res) => {
  try {
    const { _id, email, homeScore, awayScore, ot } = req.body

    const userPrediction = await Match.prediction(_id, email, homeScore, awayScore, ot)

    res.status(200).json(userPrediction)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// update finished match
const finishMatch = async (req, res) => {
  try {
    const { _id } = req.body

    const match = await Match.finish(_id)

    res.status(200).json(match)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// publish final result of the game
const publishMatch = async (req, res) => {
  try {
    const { _id, homeScore, awayScore, ot } = req.body

    const match = await Match.setResult(_id, homeScore, awayScore, ot)

    let homePoints = 0
    let awayPoints = 0

    if (homeScore > awayScore) {
      if (!ot) {
        homePoints += 3
      } else {
        homePoints += 2
        awayPoints += 1
      }
    } else {
      if (!ot) {
        awayPoints += 3
      } else {
        awayPoints += 2
        homePoints += 1
      }
    }

    const homeTeam = match.homeTeam._id
    const awayTeam = match.awayTeam._id

    await Team.updatePoints(homeTeam, homePoints)
    await Team.updatePoints(awayTeam, awayPoints)

    res.status(200).json(match)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAllMatches,
  createMatch,
  makePrediction,
  finishMatch,
  publishMatch
}
