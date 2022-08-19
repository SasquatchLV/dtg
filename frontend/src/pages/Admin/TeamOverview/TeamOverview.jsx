import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
    }
  }, [user])

  return (
    <div className={styles.teamOverview}>
      <div className={styles.teamActions}>
        <form className={styles.teamForm} onSubmit={handleSubmit}>
          <h3>{t('teams.additionalTeam')}</h3>
          <label>{t('teams.name')}</label>
          <input
            type="text"
            onChange={(e) => setCountryName(e.target.value)}
            value={countryName}
            placeholder={t('placeholder.country')}
            required
          />
          <label>{t('teams.link')}</label>
          <input
            type="text"
            onChange={(e) => setCountryFlag(e.target.value)}
            value={countryFlag}
            placeholder={t('placeholder.link')}
            required
          />
          <label>{t('teams.group')}</label>
          <select onChange={(e) => setCountryGroup(e.target.value)} required>
            <option value="" hidden>{t('teams.select')}</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          {!ongoingSeason
          && (
          <h5 className={styles.err}>
            {t('teams.err')}
          </h5>
          )}
          <button
            className={styles.addBtn}
            type="submit"
            disabled={!ongoingSeason || !countryName || !countryFlag}
          >
            {t('teams.add')}
          </button>
        </form>
      </div>
      {ongoingSeason ? (
        <div className={styles.teamWrapper}>
          <h2>{t('teams.current')}</h2>
          <div className={styles.teamData}>
            <span>{t('teams.country')}</span>
            <span>W</span>
            <span>L</span>
            <span>WO</span>
            <span>LO</span>
            <span>GP</span>
            <span>P</span>
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
      ) : (
        <h2>{t('teams.noActive')}</h2>
      )}
    </div>
  )
}

export default TeamOverview
