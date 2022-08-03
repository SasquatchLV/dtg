import { useAuthContext } from './useAuthContext'
import { useFetch } from './useFetch'

export const useUser = () => {
  const { user } = useAuthContext()
  const { fetchData } = useFetch()

  const signupUser = async (email, password) => {
    const route = 'user/signup'
    const bodyParams = { email, password }
    const successMsg = `User ${email} successfully created`

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  const fetchUser = async () => {
    const { email } = user
    const route = `user/${email}`
    const bodyParams = {}
    const successMsg = ''

    const json = fetchData(route, 'GET', bodyParams, successMsg)

    return json
  }

  const promoteUser = async (email) => {
    const route = `user/promote/${email}`
    const bodyParams = {}
    const successMsg = 'User promoted'

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  const demoteUser = async (email) => {
    const route = `user/demote/${email}`
    const bodyParams = {}
    const successMsg = 'User demoted'

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  const deleteUser = async (id) => {
    const route = `user/delete/${id}`
    const bodyParams = {}
    const successMsg = 'User deleted'

    fetchData(route, 'DELETE', bodyParams, successMsg)
  }

  const updateAvatar = async (avatarLink) => {
    const { email } = user
    const route = 'user/avatar'
    const bodyParams = { email, avatarLink }
    const successMsg = 'Avatar has been changed'

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  const changeUserPassword = async (newPass) => {
    const { _id } = user
    const route = 'user/password'
    const bodyParams = { _id, newPass }
    const successMsg = `Password changed to ${newPass}`

    fetchData(route, 'POST', bodyParams, successMsg)
  }

  return {
    promoteUser, demoteUser, deleteUser, updateAvatar, fetchUser, changeUserPassword, signupUser,
  }
}
