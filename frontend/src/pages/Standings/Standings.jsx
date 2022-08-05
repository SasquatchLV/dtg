import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import TeamsCard from '../../components/TeamsCard/TeamsCard'
import styles from './Standings.module.scss'
import { errorToast } from '../../utils/toast'
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal'
import CurrentStandings from './CurrentStandings'
import PreviousStandings from './PreviousStandings'

const Standings = () => {
  const [teams, setTeams] = useState([])
  const [years, setYears] = useState([])
  const [chosenYear, setChosenYear] = useState('')
  const [newSeasonModal, setNewSeasonModal] = useState(false)
  const [finishSeasonModal, setFinishSeasonModal] = useState(false)
  const { user } = useAuthContext()

  const getAllTeams = async () => {
    const response = await fetch('/api/team/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      setTeams(json)
    }

    if (!response.ok) {
      errorToast('Can`t load')
    }
  }

  const getAllSeasons = async () => {
    const response = await fetch('/api/season/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      setYears(json.map(({ year }) => year))
      console.log(json.map(({ year }) => year))
    }

    if (!response.ok) {
      errorToast('Can`t load')
    }
  }

  useEffect(() => {
    if (user) {
      getAllSeasons()
      getAllTeams()
    }
  }, [user])

  const finishSeason = async () => {
    const year = 2021
    const response = await fetch('/api/season/end', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ year }),
    })

    await response.json()
  }

  const newSeason = async () => {

  }

  return (
    <div className={styles.container}>
      {/* <button
        onClick={() => setFinishSeasonModal(true)}
      >
        Finish season
      </button>
      <button
        onClick={() => setNewSeasonModal(true)}
      >
        Start new season
      </button>
      {newSeasonModal && (
      <ConfirmationModal
        text="Start new season?"
        handleConfirmation={newSeason}
        handleCancelation={() => setNewSeasonModal(false)}
      />
      )}
      {finishSeasonModal && (
      <ConfirmationModal
        text="Finish the season and reset all teams with matches?"
        handleConfirmation={finishSeason}
        handleCancelation={() => setFinishSeasonModal(false)}
      />
      )} */}
      <div className={styles.yearWrapper}>
        {years.map((year) => (
          <button key={year} onClick={() => setChosenYear(year)}>
            {year}
          </button>
        ))}
      </div>
      {chosenYear && <PreviousStandings seasonYear={chosenYear} />}
      {!chosenYear && <CurrentStandings />}
    </div>
  )
}

export default Standings
