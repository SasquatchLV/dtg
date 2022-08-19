import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AdminPanel.module.scss'
import MatchOverview from './MatchOverview/MatchOverview'
import TeamOverview from './TeamOverview/TeamOverview'
import UserOverview from './UserOverview/UserOverview'
import SeasonOverview from './SeasonOverview/SeasonOverview'
import { useTotoContext } from '../../hooks/useTotoContext'
import { useSeason } from '../../hooks/useSeason'

const AdminPanel = () => {
  const [activePanel, setActivePanel] = useState('User Overview')
  const { ongoingSeason } = useTotoContext()
  const { t } = useTranslation()
  const { getSeasons } = useSeason()

  useEffect(() => {
    getSeasons()
  }, [])

  const actions = [
    {
      id: 1,
      title: t('admin.user'),
      active: 'User Overview',
      handleClick: () => setActivePanel('User Overview'),
      style: {
        display: 'block',
      },
    },
    {
      id: 2,
      title: t('admin.season'),
      active: 'Season Overview',
      handleClick: () => setActivePanel('Season Overview'),
      style: {
        display: 'block',
      },
    },
    {
      id: 3,
      title: t('admin.match'),
      active: 'Match Overview',
      handleClick: () => setActivePanel('Match Overview'),
      style: {
        display: ongoingSeason ? 'block' : 'none',
      },
    },
    {
      id: 4,
      title: t('admin.team'),
      active: 'Team Overview',
      handleClick: () => setActivePanel('Team Overview'),
      style: {
        display: ongoingSeason ? 'block' : 'none',
      },
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {actions.map(({
          title, handleClick, id, style, active,
        }) => (
          <button
            className={
              activePanel === active ? styles.activeBtn : styles.actionBtn
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
      {activePanel === 'Season Overview' && <SeasonOverview />}
      {activePanel === 'User Overview' && <UserOverview />}
    </div>
  )
}

export default AdminPanel
