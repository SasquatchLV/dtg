import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // clear the cookies
    document.cookie = 'accessCookie'

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

    // redirect to login page
    window.location.href = '/login'
  }

  return { logout }
}
