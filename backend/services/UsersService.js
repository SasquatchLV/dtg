const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz')
const { formatDistance, getTime, getDate } = require('date-fns')
const AccessTokenService = require('./AccessTokenService')
const User = require('../models/userModel')

class UsersService {
  static async loginUser({ userAgent, password, email }) {
    const user = await User.login(email, password)
    const roles = Object.values(user.roles).filter(Boolean)
    const { lastFiveGames, avatar, points } = user

    // create a token
    const { token } = await AccessTokenService.getToken({
      userId: user._id,
      userAgent,
    })

    return {
      email,
      token,
      userId: user._id,
      avatar,
      lastFiveGames,
      roles,
      points,
    }
  }

  // logout user
  static async logoutUser(user) {
    const { token } = user
    await AccessTokenService.deleteToken(token)
  }

  // delete user
  static async deleteUser({ email }) {
    await User.delete(email)
  }

  // signup a user
  static async signupUser({ email, password, fullName }) {
    await User.signup(email, password, fullName)
  }

  // give admin
  static async promoteUser({ email }) {
    await User.promote(email)
  }

  // remove admin
  static async demoteUser({ email, _id }) {
    const user = await User.findById(_id)

    if (email === user.email) {
      throw new Error('You can\'t demote yourself')
    }

    await User.demote(email)
  }

  // delete admin
  static async deleteUser({ email }) {
    await User.delete(email)
  }

  // toggle user paid status
  static async toggleHasPaid({ email }) {
    await User.toggleHasPaid(email)
  }

  // updates users avatar
  static async updateUsersAvatar({ email, avatarLink }) {
    await User.updateAvatar(email, avatarLink)
  }

  // get all users
  static async getAllUsers() {
    const users = await User.find({})

    if (!users) {
      throw new Error("No users found")
    }

    users.sort((a, b) => b.points - a.points)

    return { users }
  }

  // get all paid users
  static async getPaidUsers() {
    const users = await User.find({ hasPaid: true })

    if (!users) {
      throw new Error("No users found")
    }

    users.sort((a, b) => b.points - a.points)

    return { users }
  }

  // change password
  static async changeUserPassword({ email, newPass }) {
    await User.changePass(email, newPass)
  }

  // get prize pool
  static async getPrizePool() {
    const prizePool = await User.getPrizePool()

    return { prizePool }
  }

  // get single user
  static async getSingleUser({ email }) {
    const user = await User.single(email)

    return { user }
  }

  static async searchSingleUser({ fullName }) {
    const user = await User.searchSingleUser(fullName)

    return { user }
  }

  static async determinePoints (
    email,
    homeScore,
    awayScore,
    overTime,
    pHomeScore,
    pAwayScore,
    pOverTime
  ) {
    const user = await User.findOne({ email })
  
    if (!user) {
      throw Error("Can't find user with this email")
    }
  
    // const overTimeCorrectlyPredicted = overTime === pOverTime
    if (overTime) {
      const score = Math.min(homeScore, awayScore)
      homeScore = score
      awayScore = score
    } 
  
    const pWinningDiff =
      Math.max(pHomeScore, pAwayScore) - Math.min(pHomeScore, pAwayScore)
  
    const winningDiff =
      Math.max(homeScore, awayScore) - Math.min(homeScore, awayScore)
  
    const winningTeam = (homeScore > awayScore) ? 'Home' : 'Away'
    const pWinningTeam = (pHomeScore > pAwayScore) ? 'Home' : 'Away'
  
    const precisePrediction =
      (Number(homeScore) === pHomeScore) && (Number(awayScore) === pAwayScore)
  
    const preciseDiff =
      (winningTeam === pWinningTeam) && (winningDiff === pWinningDiff)
  
    const preciseWinningTeam = (winningTeam === pWinningTeam)
  
    const addGameToHistory = (points) => {
      if (user.lastFiveGames.length === 5) {
        user.lastFiveGames.pop()
      }
  
      user.lastFiveGames.unshift(points)
    }
  
    if (precisePrediction) {
      user.points += 4
      addGameToHistory('4p')
    } else if (preciseDiff) {
      user.points += 2
      addGameToHistory('2p')
    } else if (preciseWinningTeam) {
      user.points += 1
      addGameToHistory('1p')
    } else {
      addGameToHistory('0p')
    }
  
    await user.save()
  
    return user.lastFiveGames[0]
  }
}

module.exports = UsersService
