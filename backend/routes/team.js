const express = require('express')
const { addNewTeam, getAllTeams, removeTeam } = require('../controllers/teamController')
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router()


// require auth for all workout routes
router.use(requireAuth)

// GET all teams
router.get('/all', getAllTeams)


// only admin routes
router.use(requireAdmin);

// POST a new team
router.post('/new', addNewTeam)

// DELETE a team
router.delete('/:id', removeTeam)

module.exports = router