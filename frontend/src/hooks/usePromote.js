import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const usePromote = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()

  const promoteUser = async (email) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`/api/user/promote/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log(`User ${email} promoted`)

      // update loading state
      setIsLoading(false)
    }
  }

  const demoteUser = async (email) => {
    setIsLoading(true)
    setError(null)

    if (email === user.email) {
      setIsLoading(false)
      setError("You can't demote yourself")
      return
    }

    const response = await fetch(`/api/user/demote/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log(`User ${email} demoted`)

      // update loading state
      setIsLoading(false)
    }
  }

  const deleteUser = async (id) => {
    setIsLoading(true)
    setError(null)

    if (id === user._id) {
      setIsLoading(false)
      setError("You can't delete yourself")
      return
    }

    const response = await fetch(`/api/user/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log(`${id} deleted from db`)

      // update loading state
      setIsLoading(false)
    }
  }

  return {
    promoteUser, demoteUser, deleteUser, isLoading, error, setError,
  }
}
