import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useMatch = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()

  const createMatch = async (homeTeam, awayTeam, startingTime) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/match/new', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ homeTeam, awayTeam, startingTime }),
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log('Match created')

      // update loading state
      setIsLoading(false)
    }
  }

  const makePrediction = async (_id, homeScore, awayScore, ot) => {
    setIsLoading(true)
    setError(null)
    const { email } = user

    const response = await fetch('api/match/predict', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id, email, homeScore, awayScore, ot,
      }),
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log('Prediction made')

      // update loading state
      setIsLoading(false)
    }
  }

  const finishMatch = async (_id) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/match/finish', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)
    }
  }

  const publishResult = async (_id, homeScore, awayScore, ot) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/match/publish', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id, homeScore, awayScore, ot,
      }),
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)
    }
  }

  return {
    createMatch, makePrediction, finishMatch, publishResult, isLoading, error,
  }
}
