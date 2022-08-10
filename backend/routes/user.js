const express = require("express")
const {
  loginUser,
  signupUser,
  promoteUser,
  demoteUser,
  getAllUsers,
  getSingleUser,
  toggleHasPaid,
  deleteUser,
  updateUsersAvatar,
  changeUserPassword,
  getPrizePool,
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
router.post("/signup", verifyRoles(ROLE_LIST.Admin), signupUser)

// give admin access route
router.post("/promote/:email", verifyRoles(ROLE_LIST.Admin), promoteUser)

// remove admin access route
router.post("/demote/:email", verifyRoles(ROLE_LIST.Admin), demoteUser)

// delete user route
router.post("/delete/:email", verifyRoles(ROLE_LIST.Admin), deleteUser)

// toggle user paid status route
router.post("/toggleHasPaid/:email", verifyRoles(ROLE_LIST.Admin), toggleHasPaid)

// give new avatar to user
router.post("/avatar", verifyRoles(ROLE_LIST.User), updateUsersAvatar)

// get all users route
router.get("/all", verifyRoles(ROLE_LIST.User), getAllUsers)

// change password
router.post("/password", verifyRoles(ROLE_LIST.User), changeUserPassword)

// get prize pool route
router.get("/getprizepool", verifyRoles(ROLE_LIST.User), getPrizePool)

// get single user route
router.get("/:email", verifyRoles(ROLE_LIST.User), getSingleUser)


module.exports = router
