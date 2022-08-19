import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TeamsCard from '../../../components/TeamsCard/TeamsCard'
import { useAuthContext } from '../../../hooks/useAuthContext'
import styles from './CurrentStandings.module.scss'
import { errorToast } from '../../../utils/toast'

const CurrentStandings = () => {
  const [groupA, setGroupA] = useState([])
  const [groupB, setGroupB] = useState([])
  const { user } = useAuthContext()
  const { t } = useTranslation()

  const getAllTeams = async () => {
    const response = await fetch('/api/team/all')
    const { data, status, message } = await response.json()
    if (status === 'success') {
      setGroupA(data.filter(({ group }) => group === 'A'))
      setGroupB(data.filter(({ group }) => group === 'B'))
    } else {
      errorToast(message)
    }
  }

  useEffect(() => {
    if (user) {
      getAllTeams()
    }
  }, [user])

  return (
    groupA.length ? (
      <div className={styles.container}>
        <div className={styles.teamWrapper}>
          <h4>{t('standings.groupA')}</h4>
          <div className={styles.teamData}>
            <span>{t('standings.country')}</span>
            <span>W</span>
            <span>L</span>
            <span>WO</span>
            <span>LO</span>
            <span>GP</span>
            <span>P</span>
          </div>
          {groupA?.map(({
            _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points,
          }) => (
            <TeamsCard
              key={_id}
              _id={_id}
              country={country}
              flag={flag}
              gamesWon={gamesWon}
              gamesLost={gamesLost}
              gamesWO={gamesWO}
              gamesLO={gamesLO}
              points={points}
              deletable={false}
            />
          ))}
        </div>
        <div className={styles.teamWrapper}>
          <h4>{t('standings.groupB')}</h4>
          <div className={styles.teamData}>
            <span>{t('standings.country')}</span>
            <span>W</span>
            <span>L</span>
            <span>WO</span>
            <span>LO</span>
            <span>GP</span>
            <span>P</span>
          </div>
          {groupB?.map(({
            _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points,
          }) => (
            <TeamsCard
              key={_id}
              _id={_id}
              country={country}
              flag={flag}
              gamesWon={gamesWon}
              gamesLost={gamesLost}
              gamesWO={gamesWO}
              gamesLO={gamesLO}
              points={points}
              deletable={false}
            />
          ))}
        </div>
      </div>
    ) : (
      <h2>{t('standings.noActive')}</h2>
    )
  )
}

export default CurrentStandings
