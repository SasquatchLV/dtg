const mongoose = require("mongoose")

const Schema = mongoose.Schema

const teamSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
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
    gamesWO: {
      type: Number,
      default: 0,
    },
    gamesLO: {
      type: Number,
      default: 0,
    },
    position: String,
  },
  { timestamps: true }
)

const userSchema = new Schema({
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  points: {
    type: Number,
  },
})

const usersParticipatingSchema = new Schema({
  email: String,
  homeTeamScore: Number,
  awayTeamScore: Number,
  overTime: Boolean,
})

const matchSchema = new Schema({
  title: {
    type: String,
  },
  homeTeam: {
    type: teamSchema,
    required: true,
  },
  homeTeamScore: {
    type: Number,
    default: 0,
  },
  awayTeam: {
    type: teamSchema,
    required: true,
  },
  awayTeamScore: {
    type: Number,
    default: 0,
  },
  usersParticipating: [usersParticipatingSchema],
  overTime: {
    type: Boolean,
    default: false,
  },
  startingTime: {
    type: String,
    required: true,
  },
  finished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
})

const seasonSchema = new Schema(
  {
    year: {
      type: Number,
      unique: true,
      required: true,
    },
    teams: [teamSchema],
    matches: [matchSchema],
    users: [userSchema],
    status: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Season', seasonSchema)