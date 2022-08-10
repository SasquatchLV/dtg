import React from 'react'
import styles from './UserRankingCard.module.scss'

const RankingCard = ({
  ranking, avatar, email, points,
}) => (
  <div className={styles.teamRow}>
    <span className={styles.countryRank}>
      {points}
    </span>
    <img className={styles.icon} src={avatar} alt="avatar" />
    <span className={styles.email}>{email}</span>
    {ranking === 1
    && <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png" alt="icon" />}
    {ranking === 2
    && <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/2583/2583319.png" alt="icon" />}
    {ranking === 3
    && <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/2583/2583434.png" alt="icon" />}
  </div>
)

export default RankingCard
