const express = require("express")
const {
  addNewTeam,
  getAllTeams,
  removeTeam,
} = require("../controllers/teamController")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all teams
router.get("/all", getAllTeams)

// POST a new team
router.post("/new", verifyRoles(ROLE_LIST.Admin), addNewTeam)

// DELETE a team
router.delete("/:id", verifyRoles(ROLE_LIST.Admin), removeTeam)

module.exports = router
