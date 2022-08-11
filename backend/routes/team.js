const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")
const TeamsService = require("../services/TeamsService")

const router = express.Router()

// require auth for all team routes
router.use(requireAuth)

// GET all teams
router.get('/all', verifyRoles(ROLE_LIST.User), async (req, res) => {
  try {
    const { teams } = await TeamsService.getTeams()

    res.send({
      data: teams,
      message: "All Teams",
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

// delete team by id
router.delete('/', verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { _id } = req.body

  try {
    await TeamsService.removeTeam({ _id })

    res.send({
      data: null,
      message: "Team removed",
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

// add new team
router.post('/new', verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { country, flag, group } = req.body

  try {
    await TeamsService.addTeam({ country, flag, group })

    res.send({
      data: null,
      message: "Team added",
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
