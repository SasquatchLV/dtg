import { errorToast, successToast } from '../utils/toast'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()

    if (!response.ok) {
      errorToast(json.error)
    }
    if (response.ok) {
      successToast(`Welcome ${json.email}!`)

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })
    }
  }

  return { login }
}
