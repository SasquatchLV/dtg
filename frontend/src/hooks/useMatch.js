import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { fetchData } from '../utils/fetch'

export const useMatch = () => {
  const [unsettledMatches, setUnsettledMatches] = useState([])
  const { user } = useAuthContext()

  const createMatch = async (homeTeam, awayTeam, startingTime) => {
    const route = 'match/new'
    const bodyParams = { homeTeam, awayTeam, startingTime }
    const successMsg = 'Match created'

    fetchData(user.token, route, 'POST', bodyParams, successMsg)
  }

  const makePrediction = async (_id, homeScore, awayScore, ot) => {
    const { email, token } = user
    const route = 'match/predict'
    const bodyParams = {
      _id,
      email,
      homeScore,
      awayScore,
      ot,
    }
    const successMsg = 'Prediction submitted'

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const finishMatch = async (_id) => {
    const { token } = user
    const route = 'match/finish'
    const bodyParams = { _id }
    const successMsg = ''

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const publishResult = async (_id, homeScore, awayScore, ot) => {
    const { token } = user
    const route = 'match/publish'
    const bodyParams = {
      _id,
      homeScore,
      awayScore,
      ot,
    }
    const successMsg = 'Match results published'

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const getAllMatches = async () => {
    const response = await fetch('/api/match/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()
    if (response.ok) {
      const matchesWithNoScore = json.filter(
        (match) => match.finished
          && !match.homeTeamScore
          && !match.awayTeamScore
          && !match.overTime,
      )

      setUnsettledMatches(matchesWithNoScore)
    }
  }

  return {
    createMatch,
    makePrediction,
    finishMatch,
    publishResult,
    getAllMatches,
    unsettledMatches,
  }
}
