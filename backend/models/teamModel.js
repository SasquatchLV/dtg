const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teamSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  },
  games: {
    points: {
      type: Number,
      default: 0,
    },
    gamesWon: {
      type: Number,
      default: 0,
    },
    gamesLost: {
      type: Number,
      default: 0,
    },
  },
}, { timestamps: true })

module.exports = mongoose.model('Team', teamSchema)