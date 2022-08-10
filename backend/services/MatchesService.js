const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz')
const { formatDistance, getTime, getDate } = require('date-fns')
const Match = require('../models/matchModel')

class MatchesService {
    static async getMatches({timezone}) {
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
  static async createMatch({ homeTeam, awayTeam, startingTime, selectedGameType }) {

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
    title: selectedGameType
  })

  await match.save()

  return {
    match
  }
}
}

module.exports = MatchesService;