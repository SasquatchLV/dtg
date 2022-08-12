import Signup from '../../../components/Signup/Signup'
import UserSearch from '../../../components/UserSearch/UserSearch'
import UserInfo from '../../../components/UserInfo/UserInfo'
import styles from './UserOverview.module.scss'

const UserOverview = () => (
  <div className={styles.userOverview}>
    <div className={styles.userActions}>
      <UserSearch />
      <Signup />
    </div>
    <UserInfo />
  </div>
)

export default UserOverview
