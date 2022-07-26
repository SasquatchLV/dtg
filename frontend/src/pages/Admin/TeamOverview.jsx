import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './AdminPanel.module.scss'

const TeamOverview = () => {
  const [teams, setTeams] = useState([])
  const [countryName, setCountryName] = useState('')
  const [countryFlag, setCountryFlag] = useState('')
  const { user } = useAuthContext()

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

  const totalPoints = (won, wo, lo) => {
    const total = won * 3 + wo * 2 + lo
    return total
  }

  const totalGames = (won, lost) => {
    const total = won + lost
    return total
  }

  const addTeam = async () => {
    const country = countryName
    const flag = countryFlag

    await fetch('/api/team/new', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country, flag }),
    })
  }

  useEffect(() => {
    if (user) getAllTeams()
  }, [user, addTeam])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addTeam()

    setCountryFlag('')
    setCountryName('')
  }

  return (
    <div className={styles.teamOverview}>
      <div className={styles.teamActions}>
        <form className={styles.teamForm} onSubmit={handleSubmit}>
          <h3>Add a new team</h3>
          <label>Team name:</label>
          <input
            type="text"
            onChange={(e) => setCountryName(e.target.value)}
            value={countryName}
            placeholder="type..."
            required
          />
          <label>Link to team flag:</label>
          <input
            type="text"
            onChange={(e) => setCountryFlag(e.target.value)}
            value={countryFlag}
            placeholder="type..."
            required
          />
          <button className={styles.addBtn} type="submit">
            Add Team
          </button>
        </form>
      </div>
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
          <div className={styles.teamRow} key={team.country}>
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
              {totalPoints(team.gamesWon, team.gamesWO, team.gamesLO)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamOverview
