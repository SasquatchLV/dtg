const { utcToZonedTime, format } = require('date-fns-tz')
const { formatDistance, getTime } = require('date-fns')
const Match = require('../models/matchModel')
const User = require('../models/userModel')
const Team = require('../models/teamModel')

class MatchesService {
  // get all matches
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

      const timeToLockMatch = (getTime(new Date(startingTime)) - getTime(new Date())) < 3600000

      if (timeToLockMatch) {
        match.locked = true
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

  // make a prediction
  static async makePrediction({
    matchId,
    homeScore,
    awayScore,
    overTime,
    email,
  }) {
    const user = await User.findOne({ email })
    const match = await Match.findOne({ _id: matchId })

    const { startingTime, isMatchFinished, locked, usersParticipating } = match

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

    const alreadyParticipating = usersParticipating.some((user) => user.email === email)

    if (alreadyParticipating) {
      throw new Error('Already participating')
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

  // delete a match
  static async removeMatch({ id }) {
    const match = await Match.findOne({ _id: id })

    if (!match) {
      return res.status(400).json({ error: 'No such match exists in db' })
    }

    await Match.deleteOne({ _id: id })
  }

  // publish final result of the game
  static async publishMatch({ matchId, homeScore, awayScore, overTime }) {
    const match = await Match.setResult(matchId, homeScore, awayScore, overTime)

    const { usersParticipating, title } = match

    const userArr = []

    for (let x = 0; x < usersParticipating.length; x++) {
      let user = usersParticipating[x];

      const points = await User.determinePoints(
        user.email,
        homeScore,
        awayScore,
        user.homeTeamScore,
        user.awayTeamScore,
      );

      user.pointsEarned = points;
      
      userArr.push(user);
    }

    match.save()

    let homePoints = 0
    let awayPoints = 0

    if (homeScore > awayScore) {
      if (!overTime) {
        homePoints += 3
      } else {
        homePoints += 2
        awayPoints += 1
      }
    } else {
      if (!overTime) {
        awayPoints += 3
      } else {
        awayPoints += 2
        homePoints += 1
      }
    }

    const homeTeam = match.homeTeam._id
    const awayTeam = match.awayTeam._id

    await Team.updatePoints(homeTeam, homePoints, title)
    await Team.updatePoints(awayTeam, awayPoints, title)

    return { match }
  }

  // update finished match
  static async finishMatch({ matchId }) {
    const match = await Match.finish(matchId)

    return { match }
  }
}

module.exports = MatchesService
