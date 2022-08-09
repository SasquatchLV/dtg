import { useState, useEffect } from 'react'
import TeamsCard from '../../components/TeamsCard/TeamsCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './CurrentStandings.module.scss'
import { errorToast } from '../../utils/toast'

const CurrentStandings = () => {
  const [groupA, setGroupA] = useState([])
  const [groupB, setGroupB] = useState([])
  const [activeSeason, setActiveSeason] = useState(false)
  const { user } = useAuthContext()

  const getAllTeams = async () => {
    const response = await fetch('/api/team/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      setGroupA(json.filter(({ group }) => group === 'A'))
      setGroupB(json.filter(({ group }) => group === 'B'))
    }

    if (!response.ok) {
      errorToast('Can`t load')
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
          <h4>GROUP A</h4>
          <div className={styles.teamData}>
            <span>Country</span>
            <span>Won</span>
            <span>Lost</span>
            <span>WO</span>
            <span>LO</span>
            <span>GP</span>
            <span>Points</span>
          </div>
          {groupA.map(({
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
          <h4>GROUP B</h4>
          <div className={styles.teamData}>
            <span>Country</span>
            <span>Won</span>
            <span>Lost</span>
            <span>WO</span>
            <span>LO</span>
            <span>GP</span>
            <span>Points</span>
          </div>
          {groupB.map(({
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
      <h2>No active season</h2>
    )
  )
}

export default CurrentStandings
