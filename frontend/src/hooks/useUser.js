import { fetchData } from '../utils/fetch'
import { useAuthContext } from './useAuthContext'

export const useUser = () => {
  const { user } = useAuthContext()

  const signupUser = async (email, password) => {
    const { token } = user
    const route = 'user/signup'
    const bodyParams = { email, password }
    const successMsg = `User ${email} successfully created`

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const fetchUser = async () => {
    const { token, email } = user
    const route = `user/${email}`
    const bodyParams = {}
    const successMsg = ''

    const json = fetchData(token, route, 'GET', bodyParams, successMsg)

    return json
  }

  const promoteUser = async (email) => {
    const { token } = user
    const route = `user/promote/${email}`
    const bodyParams = {}
    const successMsg = 'User promoted'

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const demoteUser = async (email) => {
    const { token } = user
    const route = `user/demote/${email}`
    const bodyParams = {}
    const successMsg = 'User demoted'

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const deleteUser = async (id) => {
    const { token } = user
    const route = `user/delete/${id}`
    const bodyParams = {}
    const successMsg = 'User deleted'

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const updateAvatar = async (avatarLink) => {
    const { email, token } = user
    const route = 'user/avatar'
    const bodyParams = { email, avatarLink }
    const successMsg = 'Avatar has been changed'

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const changeUserPassword = async (newPass) => {
    const { _id, token } = user
    const route = 'user/password'
    const bodyParams = { _id, newPass }
    const successMsg = `Password changed to ${newPass}`

    fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  return {
    promoteUser, demoteUser, deleteUser, updateAvatar, fetchUser, changeUserPassword, signupUser,
  }
}
