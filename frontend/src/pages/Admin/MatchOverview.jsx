import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useMatch } from '../../hooks/useMatch'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './AdminPanel.module.scss'
import MatchCard from '../../components/MatchCard/MatchCard'

const MatchOverview = () => {
  const [teams, setTeams] = useState([])
  const [unsettledMatches, setUnsettledMatches] = useState([])
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
  }

  const getAllMatches = async () => {
    const response = await fetch('/api/match/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()
    if (response.ok) {
      const matchesWithNoScore = json.filter((match) => (
        match.finished && !match.homeTeamScore && !match.awayTeamScore && !match.overTime
      ))

      setUnsettledMatches(matchesWithNoScore)
    }
  }

  useEffect(() => {
    if (user) {
      getAllTeams()
      getAllMatches()
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createMatch(homeTeam, awayTeam, JSON.stringify(startingTime))
  }

  const formatUTC = (dateInt, addOffset = false) => {
    const date = (!dateInt || dateInt.length < 1) ? new Date() : new Date(dateInt)

    if (typeof dateInt === 'string') {
      return date
    }

    const offset = addOffset ? date.getTimezoneOffset() : -(date.getTimezoneOffset())
    const offsetDate = new Date()
    offsetDate.setTime(date.getTime() + offset * 60000)

    return offsetDate
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
            selected={formatUTC(startingTime, true)}
            onChange={(date) => setStartingTime(formatUTC(date))}
          />
          <button className={styles.addBtn} type="submit">
            Add Match
          </button>
        </form>
      </div>
      {unsettledMatches ? (
        <div className={styles.matchWrapper}>
          <h2 className={styles.matchDesc}>
            Please add the final result to the following matches:
          </h2>
          {unsettledMatches.map((match) => (
            <MatchCard
              startingTime={match.startingTime}
              homeTeam={match.homeTeam}
              homeTeamScore={match.homeTeamScore}
              awayTeam={match.awayTeam}
              awayTeamScore={match.awayTeamScore}
              matchId={match._id}
              usersParticipating={match.usersParticipating}
              title={match.title}
              key={match._id}
            />
          ))}
        </div>
      ) : <h1>No unsettled matches to be found</h1>}
    </div>
  )
}

export default MatchOverview
