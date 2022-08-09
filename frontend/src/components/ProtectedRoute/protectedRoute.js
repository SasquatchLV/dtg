import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = React.useState(true)
  const [redirect, setRedirect] = React.useState(false)

  const tokenCheck = () => {
    fetch('/api/users/is-authorized', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.status === 'success') {
          setLoading(false)
        } else {
          setLoading(false)
          setRedirect(true)
        }
      })
      .catch((ex) => {
        setLoading(false)
        setRedirect(true)
      })
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])

  if (redirect) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return null
  }

  return <Component {...rest} />
}
