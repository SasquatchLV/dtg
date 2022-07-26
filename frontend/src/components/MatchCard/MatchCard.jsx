import styles from './Match.module.scss'

const Match = (match) => {
  return (
    <div className={styles.container}>
      <div className={styles.time}>{match.startingTime}</div>
      <div className={styles.team}>
        {match.homeTeam.country}
        <img src={match.homeTeam.flag} alt="flag" />
      </div>
      <div className={styles.result}>
        {`${match.homeTeamScore} - ${match.awayTeamScore}`}
      </div>
      <div className={styles.team}>
        <img src={match.homeTeam.flag} alt="flag" />
        {match.homeTeam.country}
      </div>
      <div className={styles.prediction}>
        <span>Predict score</span>
        <div>
          <div>
            <b>TEAM 1</b>
            <input type="text" placeholder="0" />
          </div>
          <div>
            <b>TEAM 2</b>
            <input type="text" placeholder="0" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Match
