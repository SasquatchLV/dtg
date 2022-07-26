import styles from './MatchCard.module.scss'

const Match = ({
  startingTime, homeTeam, homeTeamScore, awayTeam, awayTeamScore,
}) => (
  <div className={styles.container}>
    <div className={styles.time}>{startingTime}</div>
    <div className={styles.team}>
      {homeTeam.country}
      <img src={homeTeam.flag} alt="flag" />
    </div>
    <div className={styles.result}>
      {`${homeTeamScore} - ${awayTeamScore}`}
    </div>
    <div className={styles.team}>
      <img src={awayTeam.flag} alt="flag" />
      {awayTeam.country}
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

export default Match
