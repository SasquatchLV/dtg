import { useTotoContext } from './useTotoContext'
import { errorToast, successToast } from '../utils/toast'

export const useUser = () => {
  const { dispatch } = useTotoContext()

  const signupUser = async (email, password, fullName) => {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName }),
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }

    return { status }
  }

  const getUser = async (email) => {
    const { data, status, message } = await (await fetch(`/api/user/${email}`)).json()

    if (status === 'success') {
      dispatch({ type: 'SET_USER', payload: data })
    } else {
      errorToast(message)
    }
  }

  const findUser = async (email) => {
    const { data, status, message } = await (await fetch(`/api/user/${email}`)).json()

    if (status === 'success') {
      dispatch({ type: 'SET_FOUND_USER', payload: data })
    } else {
      errorToast(message)
    }
  }

  const getUsers = async () => {
    const { data, status, message } = await (await fetch('/api/user/all')).json()

    if (status === 'success') {
      await dispatch({ type: 'SET_USERS', payload: data })
    } else {
      errorToast(message)
    }
  }

  const getPaidUsers = async () => {
    const { data, status, message } = await (await fetch('/api/user/paid')).json()

    if (status === 'success') {
      await dispatch({ type: 'SET_PAID_USERS', payload: data })
    } else {
      errorToast(message)
    }
  }

  const getPrizePoolAndUsers = async () => {
    const { data, status, message } = await (await fetch('/api/user/prize')).json()

    if (status === 'success') {
      dispatch({ type: 'SET_PRIZEPOOL', payload: data })
      await getPaidUsers()
    } else {
      errorToast(message)
    }
  }

  const promoteUser = async (email) => {
    const { status, message } = await (await fetch(`/api/user/promote/${email}`, {
      method: 'POST',
    })).json()

    if (status === 'success') {
      await findUser(email)
    } else {
      errorToast(message)
    }
  }

  const demoteUser = async (email) => {
    const { status, message } = await (await fetch(`/api/user/demote/${email}`, {
      method: 'POST',
    })).json()

    if (status === 'success') {
      await findUser(email)
    } else {
      errorToast(message)
    }
  }

  const toggleHasPaid = async (email) => {
    const { status, message } = await (await fetch(`/api/user/paid/${email}`, {
      method: 'POST',
    })).json()

    if (status === 'success') {
      await findUser(email)
    } else {
      errorToast(message)
    }
  }

  const deleteUser = async (email) => {
    const { status, message } = await (await fetch(`/api/user/delete/${email}`, {
      method: 'DELETE',
    })).json()

    if (status === 'success') {
      dispatch({ type: 'SET_FOUND_USER', payload: {} })
    } else {
      errorToast(message)
    }
  }

  const updateAvatar = async (avatarLink) => {
    const { status, message } = await (await fetch('/api/user/avatar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatarLink }),
    })).json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }
  }

  const changeUserPassword = async (newPass) => {
    const { status, message } = await (await fetch('/api/user/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPass }),
    })).json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }
  }

  return {
    promoteUser,
    demoteUser,
    deleteUser,
    updateAvatar,
    changeUserPassword,
    signupUser,
    toggleHasPaid,
    getUsers,
    getUser,
    getPrizePoolAndUsers,
    findUser,
  }
}
