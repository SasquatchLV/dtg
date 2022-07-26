const Team = require('./teamModel');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
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
  predictedScore: {
    home: Number,
    away: Number,
  },
});

const matchSchema = new Schema({
  title: {
    type: String,
    default: "Regular game",
    required: true,
  },
  homeTeam: {
    type: teamSchema,
    required: true,
  },
  homeTeamScore: Number,
  awayTeam: {
    type: teamSchema,
    required: true,
  },
  awayTeamScore: Number,
  usersParticipating: [usersParticipatingSchema],
  overTime: {
    type: Boolean,
    default: false,
  },
  startingTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("Match", matchSchema);
