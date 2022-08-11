const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")
const SeasonService = require("../services/SeasonService")

const router = express.Router()

// require auth for all season routes
router.use(requireAuth)

// get all seasons
router.get("/all", verifyRoles(ROLE_LIST.User), async (req, res) => {
    try {
        const { seasons } = await SeasonService.getSeasons()

        res.send({
            data: seasons,
            message: "All Seasons",
            status: "success",
        })
    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            status: "error",
        })
    }
})

// get existing teams
router.get("/teams", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
    try {
        const { uniqueTeams } = await SeasonService.getPreviousSeasonTeams()

        res.send({
            data: uniqueTeams,
            message: "All Previous Seasons Teams",
            status: "success",
        })
    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            status: "error",
        })
    }
})

// get existing teams
router.post("/new", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
    const { seasonsYear, selectedTeams } = req.body

    try {
        await SeasonService.startNewSeason({ seasonsYear, selectedTeams })

        res.send({
            data: null,
            message: "New season has begun",
            status: "success",
        })
    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            status: "error",
        })
    }
})

// get single season
router.get("/:year", verifyRoles(ROLE_LIST.User), async (req, res) => {
    const { year } = req.params

    try {
        const season = await SeasonService.getSeason({ year })

        res.send({
            data: season,
            message: "Single season",
            status: "success",
        })
    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            status: "error",
        })
    }
})

// create a new season
router.post("/finish", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
    try {
        await SeasonService.finishSeason()

        res.send({
            data: null,
            message: "Season finished",
            status: "success",
        })
    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            status: "error",
        })
    }
})

module.exports = router
