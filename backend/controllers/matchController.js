const Match = require('../models/matchModel')
const Team = require('../models/teamModel')
const UserModel = require('../models/userModel')
const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz')
const { formatDistance, getTime, getDate } = require('date-fns')
const mongoose = require('mongoose')
const { User } = require('../config/rolesList')

// get all matches
const getAllMatches = async (req, res) => {
  // get timezone from request query
  const { timezone } = req.query

  try {
    const matches = await Match.find()

    if (matches.length === 0) {
      return res.status(404).json({
        error: 'No upcoming matches',
      })
    }

    // Sort matches by starting time
    matches.sort((a, b) => {
      return (
        getTime(new Date(a.startingTime)) - getTime(new Date(b.startingTime))
      )
    })

    const matchesWithUsersGameTime = matches.map((match) => {
      const { startingTime } = match

      // Get the starting time of the match in the user's timezone
      const usersGameTime = utcToZonedTime(startingTime, timezone)

      const userStartTime = format(usersGameTime, 'HH:mm (z)', {
        timeZone: timezone,
      })
      const userStartDate = format(usersGameTime, 'dd.MM.yyyy', {
        timeZone: timezone,
      })

      const isMatchFinished =
        getTime(new Date(startingTime)) < getTime(new Date())

      const userTimeTillGame = isMatchFinished
        ? `Finished ${formatDistance(new Date(startingTime), new Date(), {
            addSuffix: true,
            includeSeconds: true,
          })}`
        : formatDistance(new Date(startingTime), new Date(), {
            addSuffix: true,
            includeSeconds: true,
          })

      if (isMatchFinished) {
        match.isMatchFinished = true
        match.save()
      }

      return {
        ...match._doc,
        userStartTime,
        userStartDate,
        userTimeTillGame,
      }
    })

    res.status(200).json(matchesWithUsersGameTime)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// create new match
const createMatch = async (req, res) => {
  const { homeTeam, awayTeam, startingTime, title } = req.body

  let emptyFields = []

  if (!homeTeam) {
    emptyFields.push('Home Team')
  }
  if (!awayTeam) {
    emptyFields.push('Away Team')
  }
  if (!startingTime) {
    emptyFields.push('Date')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: `Please fill in all the fields` })
  }

  // add doc to db
  try {
    const match = await Match.create({
      homeTeam,
      awayTeam,
      startingTime,
      title
    })
    res.status(200).json(match)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get user prediction
const makePrediction = async (req, res) => {
  const { _id, email, homeScore, awayScore, ot } = req.body

  const user = await UserModel.findOne({ email })
  const match = await Match.findOne({ _id })
  const { startingTime, isMatchFinished } = match

  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  if (!user.hasPaid) {
    return res.status(400).json({ error: 'You need to pay the contribution fee to participate' })
  }

  if (!match) {
    return res.status(404).json({ error: 'Match not found' })
  }

  if (isMatchFinished) {
    return res.status(400).json({
      error: 'You can not make a prediction for a finished match',
    })
  }

  const timeTillMatch = getTime(new Date(startingTime)) - getTime(new Date())

  if (timeTillMatch < 3600000) {
    return res.status(400).json({
      error:
        'Predictions are locked. There is less than 1 hour left to the match.',
    })
  }

  try {
    const userPrediction = await Match.prediction(
      _id,
      email,
      homeScore,
      awayScore,
      ot
    )

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

    const { usersParticipating } = match

    await usersParticipating.forEach(
      ({ email, homeTeamScore, awayTeamScore }) =>
        UserModel.determinePoints(
          email,
          homeScore,
          awayScore,
          homeTeamScore,
          awayTeamScore
        )
    )

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

// delete a team
const removeMatch = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such match exists in db' })
  }

  const match = await Match.findOne({ _id: id })

  if (!match) {
    return res.status(400).json({ error: 'No such match exists in db' })
  }

  try {
    await Match.deleteOne({ _id: id })

    res.status(200).json({ message: `Match deleted successfully!` })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAllMatches,
  createMatch,
  makePrediction,
  finishMatch,
  publishMatch,
  removeMatch,
}
