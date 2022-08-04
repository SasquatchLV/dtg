import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Navigation.module.scss'

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('Matches')
  const navigate = useNavigate()

  const sections = [
    {
      id: 1,
      title: 'Matches',
      handleClick: () => {
        setActiveSection('Matches')
        navigate('/matches')
      },
    },
    {
      id: 2,
      title: 'Standings',
      handleClick: () => {
        setActiveSection('Standings')
        navigate('/standings')
      },
    },
    {
      id: 3,
      title: 'Leaderboard',
      handleClick: () => {
        setActiveSection('Leaderboard')
        navigate('/leaderboard')
      },
    },
  ]

  return (
    <div className={styles.navigation}>
      {sections.map(({ id, title, handleClick }) => (
        <span
          className={title === activeSection ? styles.active : styles.section}
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
