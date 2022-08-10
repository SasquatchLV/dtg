import React, { useState, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { errorToast } from '../../utils/toast'
import { useAuthContext } from '../../hooks/useAuthContext'

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  const isAuth = useCallback(() => {
    fetch('/api/user/is-authorized', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(({ status, error }) => {
        if (status === 'success') {
          setLoading(false)
        } else {
          dispatch({ type: 'LOGOUT' })
          errorToast(error)
          setLoading(false)
          navigate('/login', { state: { from: location }, replace: true })
        }
      })
      .catch((err) => {
        errorToast(err)
        setLoading(false)
        navigate('/login', { state: { from: location }, replace: true })
      })
  }, [location, navigate, dispatch])

  useEffect(isAuth, [isAuth])

  if (loading) {
    return (
      <div className="vh-100">
        <h1>Loading</h1>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
