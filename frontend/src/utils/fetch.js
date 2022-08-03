import { errorToast, successToast } from './toast'

export const fetchData = async (token, routeParams, methodType, bodyParams, successMsg) => {
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

  if (successMsg) {
    if (response.ok) successToast(successMsg)
  }

  return json
}
