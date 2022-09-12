const express = require("express")
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
    const response = await UsersService.loginUser({ email, password, userAgent })

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

// require auth for all workout routes
router.use(requireAuth)

router.get('/is-authorized', (req, res) => {
  const { _id } = req.user;

  try {
    res.send({
      data: { _id },
      status: 'success',
      message: 'Authorized!',
    });
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    });
  }
});

// register a user route
router.post('/signup', verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    await UsersService.signupUser({ email, password, fullName })

    res.send({
      data: email,
      status: 'success',
      message: `${email} created`,
    });
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    });
  }
})

// give admin access route
router.post("/promote/:email", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { email } = req.params;

  try {
    await UsersService.promoteUser({ email })

    res.send({
      data: email,
      message: `${email} promoted`,
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// remove admin access route
router.post("/demote/:email", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { email } = req.params
  const { _id } = req.user

  try {
    await UsersService.demoteUser({ email, _id })

    res.send({
      data: email,
      message: `${email} demoted`,
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// delete user route
router.delete("/delete/:email", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { email } = req.params

  try {
    await UsersService.deleteUser({ email })

    res.send({
      data: email,
      message: `${email} deleted`,
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// toggle user paid status route
router.post("/paid/:email", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { email } = req.params

  try {
    await UsersService.toggleHasPaid({ email })

    res.send({
      data: email,
      message: `${email} paid status changed`,
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// give new avatar to user
router.post("/avatar", verifyRoles(ROLE_LIST.User), async (req, res) => {
  const { avatarLink } = req.body
  const { email } = req.user

  try {
    await UsersService.updateUsersAvatar({ email, avatarLink })

    res.send({
      data: email,
      message: 'Avatar changed!',
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// get all users route
router.get("/all", verifyRoles(ROLE_LIST.User), async (req, res) => {
  try {
    const { users } = await UsersService.getAllUsers()

    res.send({
      data: users,
      message: 'Got all users!',
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// get all users route
router.get("/paid", verifyRoles(ROLE_LIST.User), async (req, res) => {
  try {
    const { users } = await UsersService.getPaidUsers()

    res.send({
      data: users,
      message: 'Got all users!',
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// change password
router.post("/password", verifyRoles(ROLE_LIST.User), async (req, res) => {
  const { newPass } = req.body
  const { email } = req.user

  try {
    await UsersService.changeUserPassword({ email, newPass })

    res.send({
      data: email,
      message: 'Password changed!',
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// get prize pool route
router.get("/prize", verifyRoles(ROLE_LIST.User), async (req, res) => {
  try {
    const { prizePool } = await UsersService.getPrizePool()

    res.send({
      data: prizePool,
      message: 'Prize pool found',
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// get single user route
router.get("/:email", verifyRoles(ROLE_LIST.User), async (req, res) => {
  const { email } = req.params

  try {
    const { user } = await UsersService.getSingleUser({ email })

    res.send({
      data: user,
      message: `${email} found`,
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})


module.exports = router
