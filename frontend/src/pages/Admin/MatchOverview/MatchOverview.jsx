import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import lv from 'date-fns/locale/lv'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useTotoContext } from '../../../hooks/useTotoContext'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './MatchOverview.module.scss'
import AdminMatchCard from '../../../components/MatchCard/AdminMatchCard/AdminMatchCard'
import { useTeam } from '../../../hooks/useTeam'
import { useMatch } from '../../../hooks/useMatch'

registerLocale('lv', lv)

const MatchOverview = () => {
  const [homeTeam, setHomeTeam] = useState(null)
  const [awayTeam, setAwayTeam] = useState(null)
  const [startingTime, setStartingTime] = useState(null)
  const [selectedGameType, setSelectedGameType] = useState('Regular game')
  const { user } = useAuthContext()
  const { unsettledMatches, teams } = useTotoContext()
  const { getTeams } = useTeam()
  const { getUnsettledMatches, createMatch } = useMatch()

  useEffect(() => {
    if (user) {
      getTeams()
      getUnsettledMatches()
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    createMatch(homeTeam, awayTeam, startingTime, selectedGameType)
  }

  return (
    <div className={styles.matchOverview}>
      <div className={styles.matchActions}>
        <form className={styles.matchForm} onSubmit={(e) => handleSubmit(e)}>
          <h3>Add a new match</h3>
          <label>Home Team</label>
          <select onChange={(e) => setHomeTeam(JSON.parse(e.target.value))} selected={homeTeam}>
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
            <option value="Regular game">Regular game</option>
            <option value="Quarter Finals">Quarter Finals</option>
            <option value="Semi Finals">Semi Finals</option>
            <option value="Finals - Bronze">Finals - Bronze</option>
            <option value="Finals - Gold">Finals - Gold</option>
          </select>
          <button className={styles.addBtn} type="submit">
            Add Match
          </button>
        </form>
      </div>
      <div className={styles.matchWrapper}>
        {unsettledMatches
          && unsettledMatches.map((match) => (
            <AdminMatchCard key={match._id} {...match} />
          ))}
        {!unsettledMatches.length && <h3>No unsettled matches</h3>}
      </div>
    </div>
  )
}

export default MatchOverview
