import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import lv from 'date-fns/locale/lv'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
          <h3>{t('matches.addNew')}</h3>
          <label>{t('matches.homeTeam')}</label>
          <select onChange={(e) => setHomeTeam(JSON.parse(e.target.value))} selected={homeTeam}>
            <option value="" hidden>
              {t('matches.select')}
            </option>
            {teams.map((team) => (
              <option value={JSON.stringify(team)} key={team.country}>
                {team.country}
              </option>
            ))}
          </select>
          <label>{t('matches.awayTeam')}</label>
          <select onChange={(e) => setAwayTeam(JSON.parse(e.target.value))}>
            <option value="" hidden>
              {t('matches.select')}
            </option>
            {teams.map((team) => (
              <option value={JSON.stringify(team)} key={team.country}>
                {team.country}
              </option>
            ))}
          </select>
          <label>{t('matches.startingTime')}</label>
          <DatePicker
            showTimeSelect
            dateFormat="dd.MM.yyyy HH:mm"
            locale="lv"
            selected={startingTime}
            onChange={(date) => setStartingTime(date)}
          />
          <label>{t('matches.gameType')}</label>
          <select onChange={(e) => setSelectedGameType(e.target.value)}>
            <option value="Regular game">{t('matches.regular')}</option>
            <option value="Quarter Finals">{t('matches.quarter')}</option>
            <option value="Semi Finals">{t('matches.semi')}</option>
            <option value="Finals - Bronze">{t('matches.bronze')}</option>
            <option value="Finals - Gold">{t('matches.gold')}</option>
          </select>
          <button className={styles.addBtn} type="submit">
            {t('matches.addMatch')}
          </button>
        </form>
      </div>
      <div className={styles.matchWrapper}>
        {unsettledMatches
          && unsettledMatches.map((match) => (
            <AdminMatchCard key={match._id} {...match} />
          ))}
        {!unsettledMatches.length && <h3>{t('matches.noUnsettled')}</h3>}
      </div>
    </div>
  )
}

export default MatchOverview
