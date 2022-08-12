import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import TeamsCard from '../../../components/TeamsCard/TeamsCard'
import { useAuthContext } from '../../../hooks/useAuthContext'
import styles from './TeamOverview.module.scss'
import { useTeam } from '../../../hooks/useTeam'
import { useTeamContext } from '../../../hooks/useTeamContext'

const TeamOverview = () => {
  const [countryName, setCountryName] = useState('')
  const [countryFlag, setCountryFlag] = useState('')
  const [countryGroup, setCountryGroup] = useState('')
  const [seasonAlreadyRunning, setSeasonAlreadyRunning] = useState(false)
  const { user } = useAuthContext()
  const { getTeams } = useTeam()
  const { teams } = useTeamContext()

  const getAllSeasons = async () => {
    const response = await fetch('/api/season/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const { data, message, status } = await response.json()

    if (status === 'success') {
      data.some((season) => season.status === 'active' && setSeasonAlreadyRunning(true))
    }
  }

  const addTeam = async () => {
    const country = countryName
    const flag = countryFlag
    const group = countryGroup

    await fetch('/api/team/new', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country, flag, group }),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addTeam()

    setCountryFlag('')
    setCountryName('')

    getTeams()
  }

  useEffect(() => {
    if (user) {
      getTeams()

      getAllSeasons()
    }
  }, [user])

  return (
    <div className={styles.teamOverview}>
      <div className={styles.teamActions}>
        <form className={styles.teamForm} onSubmit={handleSubmit}>
          <h3>New team for this season</h3>
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
          <label>Teams group:</label>
          <select onChange={(e) => setCountryGroup(e.target.value)} required>
            <option value="" hidden>Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          {!seasonAlreadyRunning
          && (
          <h5 className={styles.err}>
            No active season. Start season to add teams here.
          </h5>
          )}
          <button
            className={styles.addBtn}
            type="submit"
            disabled={!seasonAlreadyRunning}
          >
            Add Team
          </button>
        </form>
      </div>
      <div className={styles.teamWrapper}>
        <h2>Current season teams</h2>
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
            _id={_id}
            country={country}
            flag={flag}
            gamesWon={gamesWon}
            gamesLost={gamesLost}
            gamesWO={gamesWO}
            gamesLO={gamesLO}
            points={points}
            deletable
          />
        ))}
      </div>
    </div>
  )
}

export default TeamOverview
