const express = require("express")
const {
  loginUser,
  signupUser,
  promoteUser,
  demoteUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUsersAvatar,
  changeUserPassword,
} = require("../controllers/userController")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")

const router = express.Router()

// login route
router.post("/login", loginUser)

// require auth for all workout routes
router.use(requireAuth)

// register a user route
router.post("/signup", verifyRoles(ROLE_LIST.Admin), signupUser)

// give admin access route
router.post("/promote/:email", verifyRoles(ROLE_LIST.Admin), promoteUser)

// remove admin access route
router.post("/demote/:email", verifyRoles(ROLE_LIST.Admin), demoteUser)

// remove admin access route
router.delete("/delete/:email", verifyRoles(ROLE_LIST.Admin), deleteUser)

// give new avatar to user
router.post("/avatar", verifyRoles(ROLE_LIST.User), updateUsersAvatar)

// get all users route
router.get("/all", verifyRoles(ROLE_LIST.User), getAllUsers)

// change password
router.post("/password", verifyRoles(ROLE_LIST.User), changeUserPassword)

// get single user route
router.get("/:email", verifyRoles(ROLE_LIST.User), getSingleUser)

module.exports = router
