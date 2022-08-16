const mongoose = require("mongoose")

const Schema = mongoose.Schema

const teamSelectionSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('TeamSelection', teamSelectionSchema)