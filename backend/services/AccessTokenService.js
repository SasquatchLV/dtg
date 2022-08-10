const jwt = require('jsonwebtoken')
const AccessTokens = require('../models/AccessTokens.js')
const Users = require('../models/userModel')
require('dotenv').config({
  path: '../.env',
})
const accessTokenSecret = process.env.SECRET

class AccessTokensService {
  static async getToken({ userId, userAgent }) {
    const existingAccessToken = await AccessTokens.findOne({
      userId,
      userAgent,
    })
    if (!existingAccessToken) {
      const accessToken = await this.createToken({
        userId,
        userAgent,
      })
      if (accessToken) return accessToken
    }
    return existingAccessToken
  }
  static async createToken({ userId, userAgent }) {
    const token = jwt.sign(
      {
        userId,
        userAgent,
      },
      accessTokenSecret
    )
    const newToken = new AccessTokens({ userId, userAgent, token })
    const accessToken = await newToken.save()
    return accessToken
  }
  static async refreshToken({ userId, userAgent }) {
    const dbToken = await AccessTokens.findOne({ userId, userAgent })
    if (!dbToken) {
      return null
    }

    return {
      updatedToken: dbToken.token,
    }
  }
  static async deleteToken(token) {
    return AccessTokens.deleteOne({ token })
  }
}
module.exports = AccessTokensService
