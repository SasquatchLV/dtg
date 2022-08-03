import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import lv from 'date-fns/locale/lv'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useMatch } from '../../hooks/useMatch'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './AdminPanel.module.scss'
import MatchCard from '../../components/MatchCard/MatchCard'

registerLocale('lv', lv)

const MatchOverview = () => {
  const [teams, setTeams] = useState([])
  const [unsettledMatches, setUnsettledMatches] = useState([])
  const [homeTeam, setHomeTeam] = useState({})
  const [awayTeam, setAwayTeam] = useState({})
  const [created, setCreated] = useState(false)
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

  const getUnsettledMatches = async () => {
    const response = await fetch('/api/match/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()
    if (response.ok) {
      const matchesWithNoScore = json.filter((match) => (
        match.isMatchFinished && !match.homeTeamScore && !match.awayTeamScore && !match.overTime
      ))

      setUnsettledMatches(matchesWithNoScore)
    }
  }

  useEffect(() => {
    if (user) {
      getAllTeams()
      getUnsettledMatches()
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createMatch(homeTeam, awayTeam, startingTime)

    setCreated(true)
  }

  return (
    <div className={styles.matchOverview}>
      <div className={styles.matchActions}>
        <form className={styles.matchForm} onSubmit={(e) => handleSubmit(e)}>
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
            dateFormat="dd.MM.yyyy HH:mm"
            locale="lv"
            selected={startingTime}
            onChange={(date) => setStartingTime(date)}
            required
          />
          <button className={styles.addBtn} type="submit">
            Add Match
          </button>
          {created && <h4>Match Created</h4>}
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
              isMatchFinished={match.isMatchFinished}
            />
          ))}
        </div>
      ) : (
        <h1>No unsettled matches to be found</h1>
      )}
    </div>
  )
}

export default MatchOverview
