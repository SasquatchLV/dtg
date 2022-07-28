import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import TeamsCard from '../../components/TeamsCard/TeamsCard'
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
      toast.error(json.error, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addTeam()

    setCountryFlag('')
    setCountryName('')
  }

  useEffect(() => {
    if (user) {
      getAllTeams()
    }
  }, [user])

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
        {teams.map(({
          _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points, id,
        }) => (
          <TeamsCard
            key={_id}
            id={_id}
            _id={id}
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

export default TeamOverview
