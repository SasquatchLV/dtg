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
  const [homeTeam, setHomeTeam] = useState(null)
  const [awayTeam, setAwayTeam] = useState(null)
  const [startingTime, setStartingTime] = useState(null)
  const [selectedGameType, setSelectedGameType] = useState('Regular game')
  const { createMatch, getAllMatches, unsettledMatches } = useMatch()
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

  useEffect(() => {
    if (user) {
      getAllTeams()
      getAllMatches()
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createMatch(homeTeam, awayTeam, startingTime, selectedGameType)
  }

  return (
    <div className={styles.matchOverview}>
      <div className={styles.matchActions}>
        <form className={styles.matchForm} onSubmit={(e) => handleSubmit(e)}>
          <h3>Add a new match</h3>
          <label>Home Team</label>
          <select onChange={(e) => setHomeTeam(JSON.parse(e.target.value))}>
            <option value="" hidden>
              Select
            </option>
            {teams.map((team) => (
              <option value={JSON.stringify(team)} key={team.country}>
                {team.country}
              </option>
            ))}
          </select>
          <label>Away Team</label>
          <select onChange={(e) => setAwayTeam(JSON.parse(e.target.value))}>
            <option value="" hidden>
              Select
            </option>
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
          />
          <label>Game Type</label>
          <select onChange={(e) => setSelectedGameType(e.target.value)}>
            <option value="Regular game" selected>Regular game</option>
            <option value="Quaters">Quaters</option>
            <option value="Semis">Semis</option>
            <option value="Finals - Bronze">Finals - Bronze</option>
            <option value="Finals - Gold">Finals - Gold</option>
          </select>
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
              ot={match.overTime}
              userStartDate={match.userStartDate}
              userStartTime={match.userStartTime}
              isMatchFinished={match.isMatchFinished}
              userTimeTillGame={match.userTimeTillGame}
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
