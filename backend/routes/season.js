const express = require("express")
const {
    finishSeason, getAllSeasons, getSingleSeason, getPreviousSeasonTeams, startNewSeason,
} = require("../controllers/seasonController")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// get all seasons
router.get("/all", verifyRoles(ROLE_LIST.User), getAllSeasons)

// get existing teams
router.get("/seasonTeams", verifyRoles(ROLE_LIST.Admin), getPreviousSeasonTeams)

// get existing teams
router.post("/new", verifyRoles(ROLE_LIST.Admin), startNewSeason)

// get single season
router.get("/:year", verifyRoles(ROLE_LIST.User), getSingleSeason)

// create a new season
router.post("/finish", verifyRoles(ROLE_LIST.Admin), finishSeason)

module.exports = router
