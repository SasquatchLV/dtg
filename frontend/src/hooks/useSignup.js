import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)

    const response = await fetch('api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      toast.error(json.error, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
    }
    if (response.ok) {
      setIsLoading(false)
      toast.success(`User ${email} successfully created`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
    }
  }

  return { signup, isLoading }
}
