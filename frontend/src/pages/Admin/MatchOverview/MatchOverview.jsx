import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import lv from 'date-fns/locale/lv'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useMatchContext } from '../../../hooks/useMatchContext'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './MatchOverview.module.scss'
import MatchCard from '../../../components/MatchCard/MatchCard'
import { successToast, errorToast } from '../../../utils/toast'

registerLocale('lv', lv)

const MatchOverview = () => {
  const [teams, setTeams] = useState([])
  const [homeTeam, setHomeTeam] = useState(null)
  const [awayTeam, setAwayTeam] = useState(null)
  const [startingTime, setStartingTime] = useState(null)
  const [selectedGameType, setSelectedGameType] = useState('Regular game')
  const { user } = useAuthContext()
  const { matches, dispatch, unsettledMatches } = useMatchContext()

  useEffect(() => {
    const getAllTeams = async () => {
      const response = await fetch('/api/team/all', {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()
      if (response.ok) {
        setTeams(json)
      }
    }

    if (user) {
      getAllTeams()
    }
  }, [user])

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const getUnsettledMatches = async () => {
      const response = await fetch(`/api/match/all?timezone=${timezone}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()
      if (response.ok) {
        console.log(json)
        dispatch({
          type: 'SET_UNSETTLED_MATCHES',
          payload: json.filter(
            (match) => match.isMatchFinished
                && !match.homeTeamScore
                && !match.awayTeamScore,
          ),
        })
      }

      if (!response.ok) {
        errorToast(json.error)
      }
    }

    if (user) {
      getUnsettledMatches()
    }
  }, [user, dispatch, matches])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const match = {
      homeTeam,
      awayTeam,
      startingTime,
      selectedGameType,
    }

    const response = await fetch('/api/match/new', {
      method: 'POST',
      body: JSON.stringify(match),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      errorToast(json.error)
    }

    if (response.ok) {
      setHomeTeam(null)
      setAwayTeam(null)
      setStartingTime(null)
      setSelectedGameType('Regular game')
      successToast('Match created')
      dispatch({ type: 'CREATE_MATCH', payload: json })
    }
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
            <MatchCard key={match._id} {...match} />
          ))}
        {!unsettledMatches && <h3>No unsettled matches</h3>}
      </div>
    </div>
  )
}

export default MatchOverview
