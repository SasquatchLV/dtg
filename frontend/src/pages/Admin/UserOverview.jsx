import { useState } from 'react'
import Signup from '../../components/Signup/Signup'
import UserSearch from '../../components/UserSearch/UserSearch'
import UserInfo from '../../components/UserInfo/UserInfo'

import styles from './AdminPanel.module.scss'

const UserOverview = () => {
  const [activeUser, setActiveUser] = useState(null)

  return (
    <div className={styles.userOverview}>
      <div className={styles.userActions}>
        <UserSearch setActiveUser={setActiveUser} />
        <Signup />
      </div>
      {activeUser && <UserInfo activeUser={activeUser} />}
      {!activeUser && <div>No user selected</div>}
    </div>
  )
}

export default UserOverview
