import { errorToast, successToast } from '../utils/toast'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    const response = await fetch('/api/user/login', {
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
      successToast(`Welcome ${data.email}!`)

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: data })
    } else {
      errorToast(message)
    }
  }

  return { login }
}
