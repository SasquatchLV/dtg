import { useTotoContext } from './useTotoContext'
import { errorToast, successToast } from '../utils/toast'

export const useMatch = () => {
  const { dispatch } = useTotoContext()

  const createMatch = async (homeTeam, awayTeam, startingTime, selectedGameType) => {
    const response = await fetch('/api/match/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        homeTeam, awayTeam, startingTime, selectedGameType,
      }),
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }

    getMatches()
  }

  const makePrediction = async (matchId, homeScore, awayScore, overTime) => {
    const response = await fetch('/api/match/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        matchId, homeScore, awayScore, overTime,
      }),
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }

    getMatches()
  }

  const finishMatch = async (matchId) => {
    const response = await fetch('/api/match/finish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId }),
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }
  }

  const publishResult = async (matchId, homeScore, awayScore, overTime) => {
    const response = await fetch('/api/match/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        matchId, homeScore, awayScore, overTime,
      }),
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    }

    if (status === 'error') {
      errorToast(message)
    }

    getUnsettledMatches()
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const getMatches = async () => {
    const { data, status, message } = await (await fetch(`/api/match/all?timezone=${timezone}`)).json()

    if (status === 'success') {
      dispatch({ type: 'SET_MATCHES', payload: data })
    } else {
      errorToast(message)
    }
  }

  const getUnsettledMatches = async () => {
    const { data, status, message } = await (await fetch(`/api/match/all?timezone=${timezone}`)).json()

    if (status === 'success') {
      dispatch({
        type: 'SET_UNSETTLED_MATCHES',
        payload: data.filter(
          (match) => match.isMatchFinished
              && (!match.homeTeamScore && !match.awayTeamScore),
        ),
      })
    } else {
      errorToast(message)
    }
  }

  const deleteMatch = async (id) => {
    const response = await fetch(`/api/match/${id}`, {
      method: 'DELETE',
    })

    const { message, status } = await response.json()

    if (status === 'success') {
      successToast(message)
      getMatches()
    }

    if (status === 'error') {
      errorToast(message)
    }
  }

  return {
    createMatch,
    makePrediction,
    finishMatch,
    publishResult,
    getMatches,
    deleteMatch,
    getUnsettledMatches,
  }
}
