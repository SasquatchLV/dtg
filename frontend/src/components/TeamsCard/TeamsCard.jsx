import React from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './TeamsCard.module.scss'

const TeamsCard = ({
  _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points,
}) => {
  const { user } = useAuthContext()
  const isAdmin = user?.roles?.includes(2000)

  const handleDelete = async (id) => {
    const response = await fetch(`/api/team/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      toast.success(json.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
    }

    if (!response.ok) {
      toast.error(json.error, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
    }
  }

  const totalGames = (won, lost) => {
    const total = won + lost
    return total
  }

  return (

    <div className={styles.teamRow}>
      <img className={styles.flagIcon} src={flag} alt="icon" />
      <span className={styles.countryName}>{country}</span>
      <span className={styles.countryInfo}>{gamesWon}</span>
      <span className={styles.countryInfo}>{gamesLost}</span>
      <span className={styles.countryInfo}>{gamesWO}</span>
      <span className={styles.countryInfo}>{gamesLO}</span>
      <span className={styles.countryInfo}>
        {totalGames(gamesWon, gamesLost)}
      </span>
      <span className={styles.countryPoints}>
        {points}
      </span>
      {isAdmin && (
        <div className={styles.teamActions}>
          <button className={styles.deleteButton} onClick={() => handleDelete(_id)}>Delete</button>
        </div>
      )}
    </div>

  )
}

export default TeamsCard
