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

// static method to update result
teamSchema.statics.updatePoints = async function (_id, points, title) {
  const Team = await this.findOne({ _id })

  if (!Team) {
    throw Error("Can't find team")
  }

  if (title === "Finals - Gold") {
    if (points > 1) {
      Team.position = '1'
    } else {
      Team.position = '2'
    }
  } else if (title === "Finals - Bronze") {
    if (points > 1) {
      Team.position = '3'
    } else {
      Team.position = '4'
    }
  } else if (title === "Semi Finals") {
    if (points < 2) {
      Team.position = '4'
    }
  } else if (title === "Quarter Finals") {
    if (points < 2) {
      Team.position = '5'
    }
  } else {
    Team.position = 'eliminated'
    Team.points += points
    if (!points) {
      Team.gamesLost += 1
    } else if (points === 1) {
      Team.gamesLO += 1
    } else if (points === 2) {
      Team.gamesWO += 1
    } else {
      Team.gamesWon += 1
    }
  }

  await Team.save()

  return Team
}

module.exports = mongoose.model('Team', teamSchema)
