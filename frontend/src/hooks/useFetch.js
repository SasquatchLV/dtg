import { useAuthContext } from './useAuthContext'
import { errorToast, successToast } from '../utils/toast'

export const useFetch = () => {
  const { user } = useAuthContext()

  const fetchData = async (routeParams, methodType, bodyParams, successMsg) => {
    const { token } = user
    const response = await fetch(`/api/${routeParams}`, {
      method: methodType,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyParams),
    })

    const json = await response.json()

    if (!response.ok) errorToast(json.error)

    if (response.ok) {
      if (successMsg) {
        successToast(successMsg)
      }
    }

    return json
  }

  return {
    fetchData,
  }
}
