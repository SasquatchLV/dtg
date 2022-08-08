const express = require("express")
const {
    endSeason, getAllSeasons, getSingleSeason, getPreviousSeasonTeams,
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

// get single season
router.get("/:year", verifyRoles(ROLE_LIST.User), getSingleSeason)

// create a new season
router.post("/end", verifyRoles(ROLE_LIST.Admin), endSeason)

module.exports = router
