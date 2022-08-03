import { useFetch } from './useFetch'

export const useTeam = () => {
  const { fetchData } = useFetch()

  const getAllTeams = async () => {
    const route = 'team/all'
    const bodyParams = {}
    const successMsg = ''

    const json = await fetchData(route, 'GET', bodyParams, successMsg)

    return json
  }

  return {
    getAllTeams,
  }
}
