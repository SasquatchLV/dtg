import { useState, useEffect } from 'react'
import styles from './AdminPanel.module.scss'
import MatchOverview from './MatchOverview/MatchOverview'
import TeamOverview from './TeamOverview/TeamOverview'
import UserOverview from './UserOverview/UserOverview'
import SeasonOverview from './SeasonOverview/SeasonOverview'
import { useTotoContext } from '../../hooks/useTotoContext'
import { useSeason } from '../../hooks/useSeason'
import { useAuthContext } from '../../hooks/useAuthContext'

const AdminPanel = () => {
  const [activePanel, setActivePanel] = useState('Season Overview')
  const { ongoingSeason } = useTotoContext()
  const { getSeasons } = useSeason()

  const handleRefresh = () => {
    getSeasons()
  }

  useEffect(() => {
    handleRefresh()
  }, [])

  const actions = [
    {
      id: 1,
      title: 'Season Overview',
      handleClick: () => setActivePanel('Season Overview'),
      style: {
        display: 'block',
      },
    },
    {
      id: 2,
      title: 'Match Overview',
      handleClick: () => setActivePanel('Match Overview'),
      style: {
        display: ongoingSeason ? 'block' : 'none',
      },
    },
    {
      id: 3,
      title: 'Team Overview',
      handleClick: () => setActivePanel('Team Overview'),
      style: {
        display: ongoingSeason ? 'block' : 'none',
      },
    },
    {
      id: 4,
      title: 'User Overview',
      handleClick: () => setActivePanel('User Overview'),
      style: {
        display: 'block',
      },
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {actions.map(({
          title, handleClick, id, style,
        }) => (
          <button
            className={
              activePanel === title ? styles.activeBtn : styles.actionBtn
            }
            onClick={handleClick}
            key={id}
            style={style}
          >
            {title}
          </button>
        ))}
      </div>
      {activePanel === 'Match Overview' && <MatchOverview />}
      {activePanel === 'Team Overview' && <TeamOverview />}
      {activePanel === 'Season Overview' && <SeasonOverview handleRefresh={handleRefresh} />}
      {activePanel === 'User Overview' && <UserOverview />}
    </div>
  )
}

export default AdminPanel
