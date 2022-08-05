import React from 'react'
import styles from './RankingCard.module.scss'

const RankingCard = ({ ranking, flag, country }) => (
  <div className={styles.teamRow}>
    <span className={styles.countryRank}>
      {ranking}
    </span>
    <img className={styles.flagIcon} src={flag} alt="icon" />
    <span className={styles.countryName}>{country}</span>
    {ranking === 1
    && <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png" alt="icon" />}
    {ranking === 2
    && <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/2583/2583319.png" alt="icon" />}
    {ranking === 3
    && <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/2583/2583434.png" alt="icon" />}
  </div>
)

export default RankingCard
