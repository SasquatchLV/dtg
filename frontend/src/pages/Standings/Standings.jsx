import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Standings.module.scss'
import { errorToast } from '../../utils/toast'
import CurrentStandings from './CurrentStandings'
import PreviousStandings from './PreviousStandings'

const Standings = () => {
  const [years, setYears] = useState([])
  const [chosenYear, setChosenYear] = useState('')
  const { user } = useAuthContext()

  const getAllSeasons = async () => {
    const response = await fetch('/api/season/all')

    const { data, status, message } = await response.json()

    if (status === 'success') {
      setYears(data.filter((season) => season.status === 'finished').map(({ year }) => year))
    } else {
      errorToast(message)
    }
  }

  useEffect(() => {
    if (user) {
      getAllSeasons()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <div className={styles.yearWrapper}>
        {years.map((year) => (
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
