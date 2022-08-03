import { fetchData } from '../utils/fetch'
import { useAuthContext } from './useAuthContext'

export const useTeam = () => {
  const { user } = useAuthContext()

  const getAllTeams = async () => {
    const { token } = user
    const route = 'team/all'
    const bodyParams = {}
    const successMsg = ''

    fetchData(token, route, 'GET', bodyParams, successMsg)
  }

  return {
    getAllTeams,
  }
}
