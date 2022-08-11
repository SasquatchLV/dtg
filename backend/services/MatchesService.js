const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz')
const { formatDistance, getTime, getDate } = require('date-fns')
const Match = require('../models/matchModel')
const User = require('../models/userModel')

class MatchesService {
  static async getMatches({ timezone }) {
    const matches = await Match.find()

    if (matches.length === 0) {
      return {
        matches: [],
      }
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

    return {
      matches: matchesWithUsersGameTime,
    }
  }

  // create new match
  static async createMatch({
    homeTeam,
    awayTeam,
    startingTime,
    selectedGameType,
  }) {
    let emptyFields = []

    if (!homeTeam) {
      emptyFields.push('Home Team')
    }
    if (!awayTeam) {
      emptyFields.push('Away Team')
    }
    if (!startingTime) {
      emptyFields.push('Starting time')
    }
    if (!selectedGameType) {
      emptyFields.push('Game type')
    }
    if (emptyFields.length > 0) {
      throw new Error(`${emptyFields.join(', ')} is required`)
    }

    const match = await Match.create({
      homeTeam,
      awayTeam,
      startingTime,
      title: selectedGameType,
    })

    await match.save()

    return {
      match,
    }
  }

  static async makePrediction({
    matchId,
    homeScore,
    awayScore,
    overTime,
    email,
  }) {
    const user = await User.findOne({ email })
    const match = await Match.findOne({ _id: matchId })
    const { startingTime, isMatchFinished } = match

    console.log(matchId)
    console.log('match', match)

    if (!user) {
      throw new Error('User not found')
    }

    if (!user.hasPaid) {
      throw new Error('You need to pay the contribution fee to participate')
    }

    if (!match) {
      throw new Error('Match not found')
    }

    if (isMatchFinished) {
      throw new Error('You can not make a prediction for a finished match')
    }

    const timeTillMatch = getTime(new Date(startingTime)) - getTime(new Date())

    if (timeTillMatch < 3600000) {
      throw new Error(
        'Predictions are locked. There is less than 1 hour left to the match'
      )
    }

    const userPrediction = await Match.prediction({
      _id: matchId,
      email,
      homeScore,
      awayScore,
      overTime,
    })

    return {
      userPrediction,
    }
  }
}

module.exports = MatchesService
