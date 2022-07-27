import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      toast.error(`${json.error}`, {
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
      // show a toast

      toast.success(`Welcome ${json.email}!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading }
}
