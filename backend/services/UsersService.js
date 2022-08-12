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
    const { token } = await AccessTokenService.createToken({
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
  static async signupUser({ email, password }) {
    await User.signup(email, password)
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
}

module.exports = UsersService
