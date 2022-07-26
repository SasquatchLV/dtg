import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useMatch= () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext();

  const createMatch = async (homeTeam, awayTeam, startingTime) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/match/new', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ homeTeam, awayTeam, startingTime })
    })
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      console.log(`Match created`);

      // update loading state
      setIsLoading(false);
    }
  }

  return { createMatch, isLoading, error }
}