const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const AccessTokenService = require("../services/AccessTokenService")
const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { cookies, headers } = req;
  const { accessCookie } = cookies;
  const userAgent = req.headers['user-agent'] || 'local placeholder';

  const unauthorizedResponse = {
    data: false,
    status: 'forbidden',
    message: 'Unauthorized!',
  };

  const token = accessCookie ? accessCookie.split(' ')[1] : null;

  const accessTokenSecret = process.env.SECRET

  if (!token) {
    res.send(unauthorizedResponse);
    return;
  }

  
    jwt.verify(token, accessTokenSecret, async (jwtErr, user) => {
      try {
        if (jwtErr) throw jwtErr;
  
        let { userId } = user;
        const userAgent = headers['user-agent'] ?? 'Unknown';
  
        const result = await AccessTokenService.refreshToken({
          userId, userAgent,
        });
  
        const { updatedToken } = result;
  
        res.cookie('accessCookie', `Bearer ${updatedToken}`, {
          httpOnly: true,
          sameSite: 'strict',
        });

        user = await User.findOne({ _id: userId }).select("_id")
  
        req.user = {
          _id: userId,
          token: updatedToken,
        };
  
        next();
      } catch (err) {
        console.error(err);
  
        res.send(unauthorizedResponse);
      }
    });
}

module.exports = requireAuth
