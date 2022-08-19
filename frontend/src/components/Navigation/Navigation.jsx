import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Navigation.module.scss'

const Navigation = () => {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(location.pathname)
  const navigate = useNavigate()
  const { t } = useTranslation()

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
  )
}

export default Navigation
