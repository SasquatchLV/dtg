import React from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './TeamsCard.module.scss'

const TeamsCard = (props) => {
  const {
    _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points, deletable,
  } = props
  const { user } = useAuthContext()
  const isAdmin = user?.roles?.includes(2000)

  const handleDelete = async () => {
    const response = await fetch('/api/team/', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
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
      {(isAdmin && deletable) && (
      <button className={styles.delete} onClick={handleDelete}>
        <img src="https://cdn-icons-png.flaticon.com/32/3221/3221845.png" alt="delete" className={styles.deleteImg} />
      </button>
      )}
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
    </div>
  )
}

export default TeamsCard
