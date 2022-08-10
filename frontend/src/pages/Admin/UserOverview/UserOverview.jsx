import { useState } from 'react'
import Signup from '../../../components/Signup/Signup'
import UserSearch from '../../../components/UserSearch/UserSearch'
import UserInfo from '../../../components/UserInfo/UserInfo'
import { useUser } from '../../../hooks/useUser'
import styles from './UserOverview.module.scss'

const UserOverview = () => {
  const [activeUser, setActiveUser] = useState(null)
  const { fetchUser } = useUser()

  const fetchData = async (email) => {
    if (!email) {
      setActiveUser(null)
    } else {
      const user = await fetchUser(email)

      if (!user.error) {
        setActiveUser(user)
      }
    }
  }

  return (
    <div className={styles.userOverview}>
      <div className={styles.userActions}>
        <UserSearch fetchData={fetchData} setActiveUser={setActiveUser} fetchUser={fetchUser} />
        <Signup />
      </div>
      {activeUser && <UserInfo activeUser={activeUser} fetchData={fetchData} />}
      {!activeUser && <div>No user selected</div>}
    </div>
  )
}

export default UserOverview
