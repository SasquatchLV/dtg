const express = require("express");
const {
  loginUser,
  signupUser,
  promoteUser,
  getAllUsers,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// login route
router.post("/login", loginUser);

// register a user route
router.post("/signup", signupUser);

// require auth for all routes below
router.use(requireAuth);

// give admin access route
router.post("/promote/:email", promoteUser);

// only admin routes
router.use(requireAdmin);

router.get("/", getAllUsers);

module.exports = router;
