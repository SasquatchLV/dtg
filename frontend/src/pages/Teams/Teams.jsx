import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import TeamsCard from '../../components/TeamsCard/TeamsCard'
import styles from '../Admin/AdminPanel.module.scss'
import { errorToast } from '../../utils/toast'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const getAllTeams = async () => {
      const response = await fetch('/api/team/all', {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()

      if (response.ok) {
        setTeams(json)
      }

      if (!response.ok) {
        errorToast('Can`t load')
      }
    }

    if (user) getAllTeams()
  }, [user])

  const endSeason = async () => {
    const year = 2021
    const response = await fetch('/api/season/end', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ year }),
    })

    await response.json()
  }

  return (
    <div className={styles.container}>
      <button onClick={endSeason}>new season</button>
      <div className={styles.teamWrapper}>
        <div className={styles.teamData}>
          <span>Country</span>
          <span>Won</span>
          <span>Lost</span>
          <span>WO</span>
          <span>LO</span>
          <span>GP</span>
          <span>Points</span>
        </div>
        {teams.map(({
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
          />
        ))}
      </div>
    </div>
  )
}

export default Teams
