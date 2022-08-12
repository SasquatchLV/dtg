import { useNavigate } from 'react-router-dom'
import { errorToast, successToast } from '../utils/toast'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(`${message}`)

      // remove user from storage
      localStorage.removeItem('user')

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    } else {
      errorToast(message)
    }
  }

  return { logout }
}
