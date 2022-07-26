const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const verifyRoles = require('../middleware/verifyRoles')
const ROLE_LIST = require('../config/rolesList')
const MatchesService = require('../services/MatchesService')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// make prediction of the match outcome
router.post('/predict', verifyRoles(ROLE_LIST.User), async (req, res) => {
  const { matchId, homeScore, awayScore, overTime } = req.body
  const { email } = req.user

  try {
    const { userPrediction } = await MatchesService.makePrediction({
      matchId,
      homeScore,
      awayScore,
      overTime,
      email,
    })

    res.send({
      data: userPrediction,
      message: 'Prediction made successfully',
      status: 'success',
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: 'error',
    })
  }
})

// match updates as finished
router.post('/finish', verifyRoles(ROLE_LIST.User), async (req, res) => {
  const { matchId } = req.body

  try {
    const { match } = await MatchesService.finishMatch({ matchId })

    res.send({
      data: match,
      message: 'match updated',
      status: 'success',
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: 'error',
    })
  }
})

// make prediction of the match outcome
router.post('/publish', verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { matchId, homeScore, awayScore, overTime } = req.body

  try {
    const { match } = await MatchesService.publishMatch({ matchId, homeScore, awayScore, overTime })

    res.send({
      data: match,
      message: 'Match results made public',
      status: 'success',
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: 'error',
    })
  }
})

// create a new match
router.get('/all', verifyRoles(ROLE_LIST.User), async (req, res) => {
  const { timezone } = req.query

  try {
    const { matches } = await MatchesService.getMatches({ timezone })

    res.send({
      data: matches,
      message: 'All matches',
      status: 'success',
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: 'error',
    })
  }
})

// create a new match
router.post('/new', verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { homeTeam, awayTeam, startingTime, selectedGameType } = req.body

  try {
    const { match } = await MatchesService.createMatch({
      homeTeam,
      awayTeam,
      startingTime,
      selectedGameType,
    })

    res.send({
      data: match,
      message: 'Match created',
      status: 'success',
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: 'error',
    })
  }
})

// DELETE match
router.delete('/:id', verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { id } = req.params

  try {
    await MatchesService.removeMatch({ id })

    res.send({
      data: null,
      message: 'Match deleted',
      status: 'success',
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: 'error',
    })
  }
})

module.exports = router
