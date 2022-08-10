const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: { type: String, required: true },
  userAgent: { type: String, required: true },
  token: { type: String, required: true },
});

module.exports = mongoose.model('accessTokens', tokenSchema, 'accessTokens');