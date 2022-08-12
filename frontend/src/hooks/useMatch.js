import { useMatchContext } from './useMatchContext'
import { fetchData } from '../utils/fetch'
import { errorToast, successToast } from '../utils/toast'

export const useMatch = () => {
  const { dispatch } = useMatchContext()

  const createMatch = async (homeTeam, awayTeam, startingTime, selectedGameType) => {
    const route = 'match/new'
    const bodyParams = {
      homeTeam, awayTeam, startingTime, selectedGameType,
    }

    fetchData(route, 'POST', bodyParams)
  }

  const makePrediction = async (_id, homeScore, awayScore, ot) => {
    const route = 'match/predict'
    const bodyParams = {
      _id,
      homeScore,
      awayScore,
      ot,
    }

    fetchData(route, 'POST', bodyParams)
  }

  const finishMatch = async (_id) => {
    const route = 'match/finish'
    const bodyParams = { _id }

    fetchData(route, 'POST', bodyParams)
  }

  const publishResult = async (_id, homeScore, awayScore, ot) => {
    const route = 'match/publish'
    const bodyParams = {
      _id,
      homeScore,
      awayScore,
      ot,
    }

    fetchData(route, 'POST', bodyParams)
  }

  const getAllMatches = async () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const { data, status, message } = await (await fetch(`/api/match/all?timezone=${timezone}`)).json()

    if (status === 'success') {
      dispatch({ type: 'SET_MATCHES', payload: data })
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
      await getAllMatches()
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
    getAllMatches,
    deleteMatch,
  }
}
