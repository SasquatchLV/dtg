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
  },
  { timestamps: true }
)

module.exports = mongoose.model("Team", teamSchema)
