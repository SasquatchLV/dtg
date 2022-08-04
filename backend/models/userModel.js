const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default:
      'https://icons.iconarchive.com/icons/sykonist/south-park/256/Butters-Mr-Biggles-icon.png',
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 1000,
    },
    Admin: Number,
  },
  points: {
    type: Number,
    default: 0,
  },
  lastFiveGames: {
    type: Array,
    default: [],
  },
  hasPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
})

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Can't find user with this email")
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// static promote method
userSchema.statics.promote = async function (email) {
  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Can't find user with this email")
  }

  if (user.roles.Admin) {
    throw Error('This user is already an admin')
  }

  user.roles = { User: 1000, Admin: 2000 }
  await user.save()

  return user
}

// static demote method
userSchema.statics.demote = async function (email) {
  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Can't find user with this email")
  }

  // Check if user is an admin
  if (!user.roles.Admin) {
    throw Error('This user is not an admin')
  }

  user.roles = { User: 1000 }
  await user.save()

  return user
}

// static method to toggle paid status
userSchema.statics.toggleHasPaid = async function (email) {
  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Can't find user with this email")
  }
  

  user.hasPaid = !user.hasPaid
  await user.save()

  return user
}

// static method to update avatar
userSchema.statics.updateAvatar = async function (email, avatarLink) {
  const user = await this.findOne({ email })

  if (!user) {
    throw Error("Can't find user with this email")
  }

  user.avatar = avatarLink
  await user.save()

  return user
}

// static method to change password
userSchema.statics.changePass = async function (email, newPass) {
  const user = await this.findOne({ email })

  if (!validator.isStrongPassword(newPass)) {
    throw Error('Password not strong enough')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(newPass, salt)

  user.password = hash
  await user.save()

  return user
}

// static delete method
userSchema.statics.delete = async function (email) {
  const user = await this.findOneAndDelete({ email })

  if (!user) {
    throw Error("Can't find user with this email")
  }
}

userSchema.statics.single = async function (email) {
  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Can't find user with this email")
  }

  return user
}

// static promote method
userSchema.statics.determinePoints = async function (
  email,
  homeScore,
  awayScore,
  pHomeScore,
  pAwayScore
) {
  const user = await this.findOne({ email })

  if (!user) {
    throw Error("Can't find user with this email")
  }

  const pWinningDiff =
    Math.max(pHomeScore, pAwayScore) - Math.min(pHomeScore, pAwayScore)
  const winningDiff =
    Math.max(homeScore, awayScore) - Math.min(homeScore, awayScore)

  const winningTeam = homeScore > awayScore ? 'Home' : 'Away'
  const pWinningTeam = pHomeScore > pAwayScore ? 'Home' : 'Away'

  const precisePrediction =
    Number(homeScore) === pHomeScore && Number(awayScore) === pAwayScore
  const preciseDiff =
    winningTeam === pWinningTeam && winningDiff === pWinningDiff
  const preciseWinningTeam = winningTeam === pWinningTeam

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

  return user
}

module.exports = mongoose.model('User', userSchema)
