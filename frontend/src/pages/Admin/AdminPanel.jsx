import { useState } from 'react'
import styles from './AdminPanel.module.scss'
import MatchOverview from './MatchOverview'
import TeamOverview from './TeamOverview'
import UserOverview from './UserOverview'

const AdminPanel = () => {
  const [activePanel, setActivePanel] = useState('Match Overview')

  const actions = [
    {
      id: 1,
      title: 'Match Overview',
      handleClick: () => setActivePanel('Match Overview'),
    },
    {
      id: 2,
      title: 'Team Overview',
      handleClick: () => setActivePanel('Team Overview'),
    },
    {
      id: 3,
      title: 'User Overview',
      handleClick: () => setActivePanel('User Overview'),
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {actions.map(({ id, title, handleClick }) => (
          <button
            className={
              activePanel === title ? styles.activeBtn : styles.actionBtn
            }
            onClick={handleClick}
            key={id}
          >
            {title}
          </button>
        ))}
      </div>
      {activePanel === 'Match Overview' && <MatchOverview />}
      {activePanel === 'Team Overview' && <TeamOverview />}
      {activePanel === 'User Overview' && <UserOverview />}
    </div>
  )
}

export default AdminPanel
