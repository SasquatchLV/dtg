import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Header.module.scss'
import Navigation from '../Navigation/Navigation'
import UserModal from '../UserModal/UserModal'

const Header = () => {
  const [userModalActive, setUserModalActive] = useState(false)
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const isAdmin = user?.roles?.includes(2000)

  const handleAdmin = () => {
    navigate('/admin')
  }

  const toggleUserModal = () => setUserModalActive(!userModalActive)

  return (
    <>
      <header>
        <div className={styles.container}>
          <div className={styles.infog}>
            {user && (
              <div className={styles.actions}>
                <button
                  className={styles.modalBtn}
                  onClick={toggleUserModal}
                >
                  {user.email}
                </button>
                {userModalActive && <UserModal />}
                {isAdmin && (
                  <button
                    className={styles.adminBtn}
                    onClick={handleAdmin}
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  className={styles.logoutBtn}
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <Navigation />
    </>
  )
}

export default Header
