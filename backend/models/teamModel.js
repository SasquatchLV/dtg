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
  },
  { timestamps: true }
)

// static method to update result
teamSchema.statics.updatePoints = async function (_id, points) {
  const Team = await this.findOne({ _id })

  if (!Team) {
    throw Error("Can't find team")
  }

  if (!points) {
    Team.gamesLost += 1
  } else if (points === 1) {
    Team.gamesLO += 1
  } else if (points === 2) {
    Team.gamesWO +=1
  } else {
    Team.gamesWon +=1
  }

  Team.points += points

  await Team.save()

  return Team
}

module.exports = mongoose.model("Team", teamSchema)
