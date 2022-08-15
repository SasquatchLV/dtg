import { errorToast, successToast } from '../utils/toast'
import { useTotoContext } from './useTotoContext'

export const useTeam = () => {
  const { dispatch } = useTotoContext()

  const getTeams = async () => {
    const { data, status, message } = await (await fetch('/api/team/all')).json()

    if (status === 'success') {
      await dispatch({ type: 'SET_TEAMS', payload: data })
    } else {
      errorToast(message)
    }
  }

  const addTeam = async (country, flag, group) => {
    const response = await fetch('/api/team/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country, flag, group }),
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }
  }

  const deleteTeam = async (_id) => {
    const response = await fetch('/api/team/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    } else {
      errorToast(message)
    }

    getTeams()
  }

  return {
    getTeams, addTeam, deleteTeam,
  }
}
