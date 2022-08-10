const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz')
const { formatDistance, getTime, getDate } = require('date-fns')
const AccessTokenService = require('./AccessTokenService')
const User = require('../models/userModel')

class MatchesService {
  static async loginUser ({ userAgent, password, email}) {
      const user = await User.login(email, password)
      const roles = Object.values(user.roles).filter(Boolean)
      const { lastFiveGames, avatar, points } = user
  
      // create a token
      const { token } = await AccessTokenService.createToken({userId: user._id, userAgent })

      return { email, token, userId: user._id, avatar, lastFiveGames, roles, points }
      
  }
}

module.exports = MatchesService;