import { errorToast, successToast } from '../utils/toast'
import { useTeamContext } from './useTeamContext'

export const useTeam = () => {
  const { dispatch } = useTeamContext()

  const getTeams = async () => {
    const { data, status, message } = await (await fetch('/api/team/all')).json()

    if (status === 'success') {
      await dispatch({ type: 'SET_TEAMS', payload: data })
    } else {
      errorToast(message)
    }
  }

  return {
    getTeams,
  }
}
