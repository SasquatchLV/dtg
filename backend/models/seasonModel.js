const mongoose = require("mongoose")

const Schema = mongoose.Schema

const teamSchema = new Schema(
  {
    country: {
      type: String,
      unique: true,
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
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
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
        type: String,
        unique: true,
        required: true,
    },
    teams: [teamSchema],
    matches: [matchSchema],
    users: [userSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Season', seasonSchema)