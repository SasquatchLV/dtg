const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { cookies } = req;
  const { accessCookie } = cookies;

  const unauthorizedResponse = {
    data: false,
    status: 'forbidden',
    message: 'Unauthorized!',
  };

  const token = accessCookie ? accessCookie.split(' ')[1] : null;

  if (!token) {
    res.send(unauthorizedResponse);
    return;
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select("_id")
    next()
  } catch (error) {
    res.send(unauthorizedResponse);
    return
  }
}

module.exports = requireAuth
