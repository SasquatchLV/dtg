const express = require("express")
const { createMatch, getAllMatches } = require("../controllers/matchController")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// create a new match
router.get("/all", verifyRoles(ROLE_LIST.User), getAllMatches)

// create a new match
router.post("/new", verifyRoles(ROLE_LIST.Admin), createMatch)

module.exports = router
