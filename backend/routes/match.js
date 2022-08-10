const express = require("express")
const { 
    createMatch, getAllMatches, makePrediction, finishMatch, publishMatch, removeMatch,
} = require("../controllers/matchController")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")
const MatchesService = require ("../services/MatchesService")

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// make prediction of the match outcome
router.post("/predict", verifyRoles(ROLE_LIST.User), makePrediction)

// match updates as finished
router.post("/finish", verifyRoles(ROLE_LIST.User), finishMatch)

// make prediction of the match outcome
router.post("/publish", verifyRoles(ROLE_LIST.Admin), publishMatch)

// create a new match
router.get("/all", verifyRoles(ROLE_LIST.User), async (req, res) => {
    const { timezone } = req.query

    try {
        const { matches } = await MatchesService.getMatches({timezone})

        res.send({ 
            data: matches,
            message: "All matches",
            status: "success",
        })
    }
    catch (error) {
        res.send({
            data: null,
            message: error.message,
            status: "error",
        })
    }
})

// create a new match
router.post("/new", verifyRoles(ROLE_LIST.Admin), createMatch)

// DELETE match
router.delete("/:id", verifyRoles(ROLE_LIST.Admin), removeMatch)

module.exports = router
