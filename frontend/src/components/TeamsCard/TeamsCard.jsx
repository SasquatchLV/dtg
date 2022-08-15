import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './TeamsCard.module.scss'
import { useTeam } from '../../hooks/useTeam'

const TeamsCard = (props) => {
  const {
    _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points, deletable,
  } = props
  const { user } = useAuthContext()
  const { deleteTeam } = useTeam()
  const isAdmin = user?.roles?.includes(2000)

  const totalGames = (won, lost) => {
    const total = won + lost

    return total
  }

  return (
    <div className={styles.teamRow}>
      {(isAdmin && deletable) && (
      <button className={styles.delete} onClick={() => deleteTeam(_id)}>
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
