import { fetchData } from '../utils/fetch'
import { useUserContext } from './useUserContext'
import { errorToast, successToast } from '../utils/toast'

export const useUser = () => {
  const { dispatch } = useUserContext()

  const signupUser = async (email, password) => {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }
  }

  const getUser = async (email) => {
    const { data, status, message } = await (await fetch(`/api/user/${email}`)).json()

    if (status === 'success') {
      dispatch({ type: 'SET_USER', payload: data })
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

  const getPrizePoolAndUsers = async () => {
    const { data, status, message } = await (await fetch('/api/user/prize')).json()

    if (status === 'success') {
      dispatch({ type: 'SET_PRIZEPOOL', payload: data })
      await getUsers()
    } else {
      errorToast(message)
    }
  }

  const promoteUser = async (email) => {
    const { status, message } = await (await fetch(`/api/user/promote/${email}`, {
      method: 'POST',
    })).json()

    if (status === 'success') {
      await getUser(email)
    } else {
      errorToast(message)
    }
  }

  const demoteUser = async (email) => {
    const { status, message } = await (await fetch(`/api/user/demote/${email}`, {
      method: 'POST',
    })).json()

    if (status === 'success') {
      await getUser(email)
    } else {
      errorToast(message)
    }
  }

  const toggleHasPaid = async (email) => {
    const { status, message } = await (await fetch(`/api/user/paid/${email}`, {
      method: 'POST',
    })).json()

    if (status === 'success') {
      await getUser(email)
    } else {
      errorToast(message)
    }
  }

  const deleteUser = async (email) => {
    const { status, message } = await (await fetch(`/api/user/delete/${email}`, {
      method: 'POST',
    })).json()

    if (status === 'success') {
      getUser(email)
    } else {
      errorToast(message)
    }
  }

  const updateAvatar = async (avatarLink) => {
    const route = 'user/avatar'
    const bodyParams = { avatarLink }

    await fetchData(route, 'POST', bodyParams)
  }

  const changeUserPassword = async (newPass) => {
    const route = 'user/password'
    const bodyParams = { newPass }

    await fetchData(route, 'POST', bodyParams)
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
  }
}
