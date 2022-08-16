import { errorToast, successToast } from '../utils/toast'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()

    const {
      status, data, message,
    } = json

    if (status === 'success') {
      const {
        userId, avatar, lastFiveGames, roles, points,
      } = data

      successToast(`Welcome ${data.email}!`)

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify({
        userId, avatar, lastFiveGames, roles, points, email,
      }))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: data })
    } else {
      errorToast(message)
    }
  }

  return { login }
}
