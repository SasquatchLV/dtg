import { fetchData } from '../utils/fetch'
import { useAuthContext } from './useAuthContext'

export const useUser = () => {
  const { user } = useAuthContext()

  const signupUser = async (email, password) => {
    const { token } = user
    const route = 'user/signup'
    const bodyParams = { email, password }
    const successMsg = `User ${email} successfully created`

    await fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const fetchUser = async (email) => {
    const { token } = user
    const route = `user/${email}`
    const bodyParams = null
    const successMsg = null

    const singleUser = await fetchData(token, route, 'GET', bodyParams, successMsg)

    return singleUser
  }

  const promoteUser = async (email) => {
    const { token } = user
    const route = `user/promote/${email}`
    const bodyParams = {}
    const successMsg = 'User promoted'

    await fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const demoteUser = async (email) => {
    const { token } = user
    const route = `user/demote/${email}`
    const bodyParams = {}
    const successMsg = 'User demoted'

    await fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const toggleHasPaid = async (email) => {
    const { token } = user
    const route = `user/toggleHasPaid/${email}`
    const bodyParams = {}
    const successMsg = 'User hasPaid toggled'

    await fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const deleteUser = async (id) => {
    const { token } = user
    const route = `user/delete/${id}`
    const bodyParams = {}
    const successMsg = 'User deleted'

    await fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const updateAvatar = async (avatarLink) => {
    const { email, token } = user
    const route = 'user/avatar'
    const bodyParams = { email, avatarLink }
    const successMsg = 'Avatar has been changed'

    await fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  const changeUserPassword = async (newPass) => {
    const { email, token } = user
    const route = 'user/password'
    const bodyParams = { email, newPass }
    const successMsg = 'Password changed'

    await fetchData(token, route, 'POST', bodyParams, successMsg)
  }

  return {
    promoteUser,
    demoteUser,
    deleteUser,
    updateAvatar,
    fetchUser,
    changeUserPassword,
    signupUser,
    toggleHasPaid,
  }
}
