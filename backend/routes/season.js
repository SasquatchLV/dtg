const express = require("express")
const {
    endSeason
} = require("../controllers/seasonController")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// create a new season
router.post("/end", verifyRoles(ROLE_LIST.Admin), endSeason)

module.exports = router
