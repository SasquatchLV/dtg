import { errorToast, successToast } from './toast'

export const fetchData = async (routeParams, methodType, bodyParams) => {
  const response = await fetch(`/api/${routeParams}`, {
    method: methodType,
    body: bodyParams.length ? JSON.stringify(bodyParams) : null,
  })

  const { data, message, status } = await response.json()

  if (status === 'error') {
    errorToast(message)
  }

  if (status === 'success') {
    successToast(message)
  }

  return data
}
