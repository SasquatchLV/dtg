import { useState, useEffect } from 'react'
import TeamsCard from '../../../components/TeamsCard/TeamsCard'
import { useAuthContext } from '../../../hooks/useAuthContext'
import styles from './TeamOverview.module.scss'
import { useTeam } from '../../../hooks/useTeam'
import { useTotoContext } from '../../../hooks/useTotoContext'
import { useSeason } from '../../../hooks/useSeason'

const TeamOverview = () => {
  const [countryName, setCountryName] = useState('')
  const [countryFlag, setCountryFlag] = useState('')
  const [countryGroup, setCountryGroup] = useState('')
  const { user } = useAuthContext()
  const { getTeams, addTeam } = useTeam()
  const { getSeasons } = useSeason()
  const { teams, ongoingSeason } = useTotoContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addTeam(countryName, countryFlag, countryGroup)

    setCountryFlag('')
    setCountryName('')

    getTeams()
  }

  useEffect(() => {
    if (user) {
      getTeams()
      getSeasons()
    }
  }, [user])

  return (
    <div className={styles.teamOverview}>
      <div className={styles.teamActions}>
        <form className={styles.teamForm} onSubmit={handleSubmit}>
          <h3>Additional team for this season</h3>
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
          {!ongoingSeason
          && (
          <h5 className={styles.err}>
            No active season. Start season to add teams here.
          </h5>
          )}
          <button
            className={styles.addBtn}
            type="submit"
            disabled={!ongoingSeason || !countryName || !countryFlag}
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
        {teams?.map(({
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
