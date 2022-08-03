import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useFetch } from './useFetch'

export const useMatch = () => {
  const { user } = useAuthContext()
  const { fetchData } = useFetch()

  const createMatch = async (homeTeam, awayTeam, startingTime) => {
    const route = 'match/new'
    const bodyParams = { homeTeam, awayTeam, startingTime }
    const successMsg = 'Match created'

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  const makePrediction = async (_id, homeScore, awayScore, ot) => {
    const { email } = user
    const route = 'match/predict'
    const bodyParams = {
      _id, email, homeScore, awayScore, ot,
    }
    const successMsg = 'Prediction submitted'

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  const finishMatch = async (_id) => {
    const route = 'match/finish'
    const bodyParams = { _id }
    const successMsg = ''

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  const publishResult = async (_id, homeScore, awayScore, ot) => {
    const route = 'match/publish'
    const bodyParams = {
      _id, homeScore, awayScore, ot,
    }
    const successMsg = 'Match results published'

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  const getAllMatches = async () => {
    const route = 'match/all'
    const bodyParams = {}
    const successMsg = ''

    fetchData(route, 'GET', bodyParams, successMsg)
  }

  return {
    createMatch, makePrediction, finishMatch, publishResult, getAllMatches,
  }
}
