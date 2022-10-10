import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './Standings.module.scss'
import CurrentStandings from './CurrentStandings/CurrentStandings'
import PreviousStandings from './PreviousStandings/PreviousStandings'
import { useSeason } from '../../hooks/useSeason'
import Sidebar from '../../components/Sidebar/Sidebar'

const Standings = () => {
  const [chosenYear, setChosenYear] = useState('')
  const { user } = useAuthContext()
  const { years } = useTotoContext()
  const { getSeasons } = useSeason()
  const { t } = useTranslation()

  useEffect(() => {
    if (user) {
      getSeasons()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <div className={styles.standingsContainer}>
        <div className={styles.yearWrapper}>
          {years?.map((year) => (
            <button
              key={year}
              onClick={() => setChosenYear(year)}
              className={styles.yearBtn}
            >
              {year}
            </button>
          ))}
          <button
            onClick={() => setChosenYear('')}
            className={styles.yearBtn}
          >
            {t('standings.currentStandings')}
          </button>
        </div>
        <h3>{chosenYear ? `${chosenYear} ${t('standings.standings')}` : t('standings.currentStandings')}</h3>
        {chosenYear && <PreviousStandings seasonYear={chosenYear} />}
        {!chosenYear && <CurrentStandings />}
      </div>
      <Sidebar />
    </div>
  )
}

export default Standings
