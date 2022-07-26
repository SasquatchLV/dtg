const express = require("express");
const {
  loginUser,
  signupUser,
  promoteUser,
  demoteUser,
  getAllUsers,
  getSingleUser,
  deleteUser
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const verifyRoles = require("../middleware/verifyRoles");
const ROLE_LIST = require("../config/rolesList");

const router = express.Router();

// login route
router.post("/login", loginUser);

// register a user route
router.post("/signup", signupUser);

// require auth for all routes below
router.use(requireAuth);

// only admin routes

// give admin access route
router.post("/promote/:email", verifyRoles(ROLE_LIST.Admin), promoteUser);

// remove admin access route
router.post("/demote/:email", verifyRoles(ROLE_LIST.Admin), demoteUser);

// remove admin access route
router.post("/delete/:email", verifyRoles(ROLE_LIST.Admin), deleteUser);

// get all users route
router.get("/all", verifyRoles(ROLE_LIST.Admin), getAllUsers);

// get single user route
router.get("/:email", verifyRoles(ROLE_LIST.Admin), getSingleUser);

module.exports = router;
