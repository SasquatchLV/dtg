const Match = require('../models/matchModel')
const mongoose = require('mongoose')

// get all matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({createdAt: -1});

    if (!matches) return res.status(204).json({ message: "No upcoming matches" });

    res.status(200).json(matches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// create new match
const createMatch = async (req, res) => {
  const {homeTeam, awayTeam, startingTime} = req.body

  let emptyFields = []

  if(!homeTeam) {
    emptyFields.push('Home Team')
  }
  if(!awayTeam) {
    emptyFields.push('Away Team')
  }
  if(!startingTime) {
    emptyFields.push('Date')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const match = await Match.create({homeTeam, awayTeam, startingTime})
    res.status(200).json(match)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a match
const deleteMatch = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a match
const updateMatch = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}


module.exports = {
  getAllMatches,
  createMatch
}