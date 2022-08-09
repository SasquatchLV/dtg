const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const token = req.cookies.accessCookie

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  const splitToken = token.split(" ")[1]

  try {
    const { _id } = jwt.verify(splitToken, process.env.SECRET)

    req.user = await User.findOne({ _id }).select("_id")
    next()
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" })
  }
}

module.exports = requireAuth
