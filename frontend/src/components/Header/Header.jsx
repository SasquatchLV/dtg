import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Header.module.scss'
import UserModal from '../UserModal/UserModal'

const Header = () => {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(location.pathname)
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

  const sections = [
    {
      id: 1,
      title: t('header.matches'),
      handleClick: () => {
        setActiveSection('/matches')
        navigate('/matches')
      },
      pathname: '/matches',
    },
    {
      id: 2,
      title: t('header.standings'),
      handleClick: () => {
        setActiveSection('/standings')
        navigate('/standings')
      },
      pathname: '/standings',
    },
    {
      id: 3,
      title: t('header.leaderboard'),
      handleClick: () => {
        setActiveSection('/leaderboard')
        navigate('/leaderboard')
      },
      pathname: '/leaderboard',
    },
  ]

  return (
    <div className={styles.container}>
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
      <div className={styles.navigation}>
        {sections.map(({
          id, title, pathname, handleClick,
        }) => (
          <span
            className={pathname === activeSection ? styles.active : styles.section}
            onClick={handleClick}
            key={id}
          >
            {title}
          </span>
        ))}
      </div>
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
  )
}

export default Header
