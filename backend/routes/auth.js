const express = require("express")
const {
  loginUser,
} = require("../controllers/userController")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")
const UsersService = require("../services/UsersService")

const router = express.Router()

// login route
router.post("/login", async (req, res) => {
  const userAgent = req.headers['user-agent'] || 'local placeholder';
  const { email, password } = req.body

  try {
    const response = await UsersService.loginUser({email, password, userAgent})

    res.cookie('accessCookie', `Bearer ${response.token}`, {
      httpOnly: true,
      sameSite: 'strict',
    })

    res.send({
      data: response,
      status: 'success',
      message: 'User logged in successfully',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    })
  }
})

module.exports = router
