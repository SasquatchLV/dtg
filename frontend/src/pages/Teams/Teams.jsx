import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from '../Admin/AdminPanel.module.scss'

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
        console.log('Unauthorized')
      }
    }

    if (user) getAllTeams()
  }, [user])

  const totalGames = (won, lost) => {
    const total = won + lost
    return total
  }

  return (
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
      {teams.map((team) => (
        <div className={styles.teamRow} key={team._id}>
          <img className={styles.flagIcon} src={team.flag} alt="icon" />
          <span className={styles.countryName}>{team.country}</span>
          <span className={styles.countryInfo}>{team.gamesWon}</span>
          <span className={styles.countryInfo}>{team.gamesLost}</span>
          <span className={styles.countryInfo}>{team.gamesWO}</span>
          <span className={styles.countryInfo}>{team.gamesLO}</span>
          <span className={styles.countryInfo}>
            {totalGames(team.gamesWon, team.gamesLost)}
          </span>
          <span className={styles.countryPoints}>
            {team.points}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Teams
