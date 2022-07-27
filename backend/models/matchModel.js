const Team = require("./teamModel")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const teamSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
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
})

const usersParticipatingSchema = new Schema({
  email: String,
  homeTeamScore: Number,
  awayTeamScore: Number,
  overTime: Boolean
})

const matchSchema = new Schema({
  title: {
    type: String,
    default: "Regular game",
  },
  homeTeam: {
    type: teamSchema,
    required: true,
  },
  homeTeamScore: {
    type: Number,
    default: 0
  },
  awayTeam: {
    type: teamSchema,
    required: true,
  },
  awayTeamScore: {
    type: Number,
    default: 0
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
    default: false
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
})

// static prediction method
matchSchema.statics.prediction = async function (_id, email, homeScore, awayScore, ot) {
  const match = await this.findOne({ _id })

  if (!match) {
    throw Error("Can't find match")
  }

  const userPrediction = {
    email: email,
    homeTeamScore: homeScore,
    awayTeamScore: awayScore,
    overTime: ot
  }

  match.usersParticipating = [...match.usersParticipating, userPrediction]

  await match.save()

  return match
}

// static finish method
matchSchema.statics.finish = async function (_id) {
  const match = await this.findOne({ _id })

  if (!match) {
    throw Error("Can't find match")
  }

  match.finished = true

  await match.save()

  return match
}

// static method to set final result of the match
matchSchema.statics.setResult = async function (_id, homeScore, awayScore, ot) {
  const match = await this.findOne({ _id })

  if (!match) {
    throw Error("Can't find match")
  }

  match.homeTeamScore = homeScore
  match.awayTeamScore = awayScore
  match.overTime = ot

  await match.save()

  return match
}

module.exports = mongoose.model("Match", matchSchema)
