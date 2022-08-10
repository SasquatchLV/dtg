import React, { useState } from 'react'
import {
  Navigate, Route, useLocation, useNavigate,
} from 'react-router-dom'

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const tokenCheck = () => {
    fetch('/api/user/is-authorized', {
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
          navigate('/login', { state: { from: location }, replace: true })
        }
      })
      .catch((err) => {
        setLoading(false)
        navigate('/login', { state: { from: location }, replace: true })
      })
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])

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
