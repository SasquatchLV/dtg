import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './Standings.module.scss'
import CurrentStandings from './CurrentStandings/CurrentStandings'
import PreviousStandings from './PreviousStandings/PreviousStandings'
import { useSeason } from '../../hooks/useSeason'

const Standings = () => {
  const [chosenYear, setChosenYear] = useState('')
  const { user } = useAuthContext()
  const { years } = useTotoContext()
  const { getSeasons } = useSeason()

  useEffect(() => {
    if (user) {
      getSeasons()
    }
  }, [user])

  return (
    <div className={styles.container}>
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
          Current standings
        </button>
      </div>
      <h3>{chosenYear ? `${chosenYear} Standings ` : 'Current Standings'}</h3>
      {chosenYear && <PreviousStandings seasonYear={chosenYear} />}
      {!chosenYear && <CurrentStandings />}
    </div>
  )
}

export default Standings
