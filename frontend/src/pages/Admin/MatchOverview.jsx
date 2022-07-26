import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useMatch } from '../../hooks/useMatch'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './AdminPanel.module.scss'

const MatchOverview = () => {
  const [teams, setTeams] = useState([])
  const [homeTeam, setHomeTeam] = useState({})
  const [awayTeam, setAwayTeam] = useState({})
  const [startingTime, setStartingTime] = useState(new Date())
  const { createMatch } = useMatch()
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

  const getAllMatches = async () => {
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

  useEffect(() => {
    if (user) {
      getAllTeams()
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createMatch(homeTeam, awayTeam, JSON.stringify(startingTime))
  }

  return (
    <div className={styles.matchOverview}>
      <div className={styles.matchActions}>
        <form className={styles.matchForm} onSubmit={handleSubmit}>
          <h3>Add a new match</h3>
          <label>Home Team</label>
          <select
            onChange={(e) => setHomeTeam(JSON.parse(e.target.value))}
            required
          >
            <option value="">Select</option>
            {teams.map((team) => (
              <option value={JSON.stringify(team)} key={team.country}>
                {team.country}
              </option>
            ))}
          </select>
          <label>Away Team</label>
          <select
            onChange={(e) => setAwayTeam(JSON.parse(e.target.value))}
            required
          >
            <option value="">Select</option>
            {teams.map((team) => (
              <option value={JSON.stringify(team)} key={team.country}>
                {team.country}
              </option>
            ))}
          </select>
          <label>Starting time</label>
          <DatePicker
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mmaa"
            selected={startingTime}
            onChange={(startTime) => setStartingTime(startTime)}
          />
          <button className={styles.addBtn} type="submit">
            Add Match
          </button>
        </form>
      </div>

      <div className={styles.matchWrapper}>matches</div>
    </div>
  )
}

export default MatchOverview
