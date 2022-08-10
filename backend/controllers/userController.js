const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const AccessTokenService = require('../services/accessTokenService')

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const roles = Object.values(user.roles).filter(Boolean)
    const { lastFiveGames, avatar, points } = user

    // create a token
    const token = AccessTokenService.createToken(user._id, )

    res.cookie('accessCookie', `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'strict',
    }).status(200).json({ email, token, roles, lastFiveGames, avatar, points })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// give admin
const promoteUser = async (req, res) => {
  try {
    const { email } = req.params

    await User.promote(email)

    res.status(200).json({ email })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// change password
const changeUserPassword = async (req, res) => {
  const { email, newPass } = req.body

  try {
    await User.changePass(email, newPass)

    res.status(200).json({ message: 'Password changed' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// remove admin
const demoteUser = async (req, res) => {
  try {
    const { email} = req.params
    const { _id } = req.user

    // can't demote yourself
    const user = await User.findById(_id)

    if (email === user.email) return res.status(400).json({ error: 'You can\'t demote yourself' })

    await User.demote(email)

    res.status(200).json({ email })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// toggle user paid status
const toggleHasPaid = async (req, res) => {
  try {
    const { email } = req.params

    await User.toggleHasPaid(email)

    res.status(200).json({ email })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// updates users avatar
const updateUsersAvatar = async (req, res) => {
  try {
    const { email, avatarLink } = req.body

    const user = await User.updateAvatar(email, avatarLink)

    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete admin
const deleteUser = async (req, res) => {
  try {
    const { email } = req.params

    await User.delete(email)

    res.status(200).json({ email })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) return res.status(204).json({ error: 'No users found' })
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get single user
const getSingleUser = async (req, res) => {
  try {
    const { email } = req.params

    const user = await User.single(email)

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get prize pool
const getPrizePool = async (req, res) => {
  try {
    const prizePool = await User.getPrizePool()

    res.status(200).json(prizePool)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  signupUser,
  loginUser,
  promoteUser,
  demoteUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUsersAvatar,
  changeUserPassword,
  toggleHasPaid,
  getPrizePool,
}
