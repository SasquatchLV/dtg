import { useState } from 'react'
import { formatDistance, getTime } from 'date-fns'
import styles from './MatchCard.module.scss'

const MatchCard = ({
  startingTime, homeTeam, homeTeamScore, awayTeam, awayTeamScore,
}) => {
  const [predictionActive, setPredictionActive] = useState(false)
  const time = startingTime.split('').slice(12, 17)
  const date = startingTime.split('').slice(1, 11)
  const fullDate = new Date(`${date.join('')} ${time.join('')}`)

  const isMatchFinished = getTime(fullDate) < getTime(new Date())

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <h4>
          {time}
        </h4>
        <span>{date}</span>
        <span>
          {' '}
          {isMatchFinished ? 'Finished' : formatDistance(fullDate, new Date(), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </span>
      </div>
      <div className={styles.teams}>
        <div className={styles.team1}>
          <span>{homeTeam.country}</span>
          <img src={homeTeam.flag} alt="flag" className={styles.flag} />
        </div>
        {homeTeamScore ? (
          <div className={styles.result}>
            <h4>{`${homeTeamScore} - ${awayTeamScore}`}</h4>
          </div>
        ) : (
          <div className={styles.result}>
            <b> - </b>
          </div>
        )}
        <div className={styles.team2}>
          <img src={awayTeam.flag} alt="flag" className={styles.flag} />
          {awayTeam.country}
        </div>
      </div>
      <div className={styles.prediction}>
        {!predictionActive ? (
          <button
            className={styles.predictBtn}
            onClick={() => setPredictionActive(!predictionActive)}
          >
            Participate
          </button>
        ) : (
          <div className={styles.inputWrapper}>
            <div className={styles.inputTop}>
              <div className={styles.inputBox}>
                <span>TEAM 1</span>
                <input type="text" placeholder="0" />
              </div>
              <div className={styles.inputBox}>
                <span>TEAM 2</span>
                <input type="text" placeholder="0" />
              </div>
            </div>
            <button className={styles.predictBtn}>
              SUBMIT
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchCard
