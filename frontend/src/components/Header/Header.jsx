import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Header.module.scss'
import Navigation from '../Navigation/Navigation'
import UserModal from '../UserModal/UserModal'

const Header = () => {
  const [userModal, setUserModal] = useState(false)
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const isAdmin = user?.roles?.includes(2000)

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const handleAdmin = () => navigate('/admin')

  const toggleUserModal = () => setUserModal(!userModal)

  return (
    user && (
    <>
      <header>
        <div className={styles.languages}>
          <button
            className={styles.languageBtn}
            onClick={() => changeLanguage('en')}
          >
            ENG
          </button>
          <button
            className={styles.languageBtn}
            onClick={() => changeLanguage('lv')}
          >
            LAT
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.info}>
            {user && (
            <div className={styles.actions}>
              <button
                className={styles.modalBtn}
                onClick={toggleUserModal}
              >
                {user.email}
              </button>
              {userModal && <UserModal handleToggle={toggleUserModal} />}
              {isAdmin && (
              <button
                className={styles.adminBtn}
                onClick={handleAdmin}
              >
                {t('header.admin')}
              </button>
              )}
              <button
                className={styles.logoutBtn}
                onClick={logout}
              >
                {t('header.logout')}
              </button>
            </div>
            )}
          </div>
        </div>
      </header>
      <Navigation />
    </>
    ))
}

export default Header
