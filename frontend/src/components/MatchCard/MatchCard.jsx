/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react'
import { formatDistance, getTime } from 'date-fns'
import styles from './MatchCard.module.scss'
import { useMatch } from '../../hooks/useMatch'
import { useAuthContext } from '../../hooks/useAuthContext'

const MatchCard = ({
  startingTime, homeTeam, homeTeamScore, awayTeam, awayTeamScore, matchId, usersParticipating, title,
}) => {
  const { makePrediction, finishMatch, publishResult } = useMatch()
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [finalHomeScore, setFinalHomeScore] = useState(0)
  const [finalAwayScore, setFinalAwayScore] = useState(0)
  const [hasOvertime, setHasOvertime] = useState(false)

  const time = startingTime.split('').slice(12, 17)
  const date = startingTime.split('').slice(1, 11)
  const fullDate = new Date(`${date.join('')} ${time.join('')}`)
  const { user } = useAuthContext()

  const isMatchFinished = getTime(fullDate) < getTime(new Date())

  const isAdmin = user?.roles?.includes(2000)

  const alreadyParticipated = usersParticipating.some((obj) => obj.email === user.email)

  const indexOfUser = usersParticipating?.findIndex((obj) => obj.email === user.email)

  const usersBet = usersParticipating[indexOfUser]

  const hasMatchScore = homeTeamScore || awayTeamScore

  const isMatchPublished = isMatchFinished && hasMatchScore && isAdmin

  useEffect(() => {
    if (isMatchFinished) {
      finishMatch(matchId)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await makePrediction(matchId, homeScore, awayScore, hasOvertime)
  }

  const handlePublish = async (e) => {
    e.preventDefault()

    await publishResult(matchId, finalHomeScore, finalAwayScore, hasOvertime)
  }

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <h4>{time}</h4>
        <span>{date.slice(5)}</span>
      </div>
      <div className={styles.middle}>
        <h6>{title}</h6>
        <div className={styles.teams}>
          <div className={styles.team1}>
            <span>{homeTeam.country}</span>
            <img src={homeTeam.flag} alt="flag" className={styles.flag} />
          </div>
          {hasMatchScore ? (
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
        <span className={styles.timeRemaining}>
          {isMatchFinished ? 'Finished' : formatDistance(fullDate, new Date(), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </span>
      </div>
      {!alreadyParticipated ? (
        <div className={styles.prediction}>
          {!isMatchFinished ? (
            <div className={styles.inputWrapper}>
              <div className={styles.inputTop}>
                <div className={styles.inputBox}>
                  <span>TEAM 1</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputBox}>
                  <span>TEAM 2</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                className={styles.predictBtn}
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          ) : (
            !isMatchPublished ? (
              <div className={styles.inputWrapper}>
                <h4>Add final result</h4>
                <div className={styles.inputTop}>
                  <div className={styles.inputBox}>
                    <span>TEAM 1</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={finalHomeScore}
                      onChange={(e) => setFinalHomeScore(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <span>TEAM 2</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={finalAwayScore}
                      onChange={(e) => setFinalAwayScore(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  className={styles.predictBtn}
                  onClick={handlePublish}
                >
                  Publish
                </button>
              </div>
            ) : (
              <h5>Points distributed</h5>
            )
          )}
        </div>
      ) : (
        <h5 className={styles.info}>
          <i>You`ve participated</i>
          <p>Predicted Score:</p>
          <p>{`${usersBet?.homeTeamScore} - ${usersBet?.awayTeamScore}`}</p>
        </h5>
      )}
    </div>
  )
}

export default MatchCard
