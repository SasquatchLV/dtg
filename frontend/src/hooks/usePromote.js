import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from './useAuthContext'

export const usePromote = () => {
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()

  const fetchUser = async () => {
    setIsLoading(true)
    const { email, token } = user

    const response = await fetch(`/api/user/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

    return json
  }

  const promoteUser = async (email) => {
    setIsLoading(true)

    const response = await fetch(`/api/user/promote/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
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
      toast.success(`User ${email} promoted`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })

      // update loading state
      setIsLoading(false)
    }
  }

  const demoteUser = async (email) => {
    setIsLoading(true)

    if (email === user.email) {
      setIsLoading(false)
      toast.error('You can\'t demote yourself', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
      return
    }

    const response = await fetch(`/api/user/demote/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
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
      toast.success(`User ${email} demoted`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })

      // update loading state
      setIsLoading(false)
    }
  }

  const deleteUser = async (id) => {
    setIsLoading(true)

    if (id === user._id) {
      setIsLoading(false)
      toast.error('You can\'t delete yourself', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
      return
    }

    const response = await fetch(`/api/user/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
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
      toast.success(`${id} deleted from db`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })

      // update loading state
      setIsLoading(false)
    }
  }

  const updateAvatar = async (avatarLink) => {
    setIsLoading(true)

    const { email, token } = user

    const response = await fetch('/api/user/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, avatarLink }),
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
      toast.success('Avatar has been changed', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })

      // update loading state
      setIsLoading(false)
    }
  }

  const changeUserPassword = async (newPass) => {
    setIsLoading(true)

    const { email, token } = user

    const response = await fetch('/api/user/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, newPass }),
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
      toast.success('Password has been changed', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })

      // update loading state
      setIsLoading(false)
    }
  }

  return {
    promoteUser, demoteUser, deleteUser, updateAvatar, isLoading, fetchUser, changeUserPassword,
  }
}
