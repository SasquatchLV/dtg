/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react'
import { formatDistance, getTime } from 'date-fns'
import styles from './MatchCard.module.scss'
import { useMatch } from '../../hooks/useMatch'
import { useAuthContext } from '../../hooks/useAuthContext'
import FinalResult from './FinalResult'
import PredictResult from './PredictResult'

const MatchCard = ({
  startingTime, homeTeam, homeTeamScore, awayTeam, awayTeamScore, matchId, usersParticipating, title,
}) => {
  const { finishMatch } = useMatch()

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
              <b>{`${homeTeamScore} `}</b>
              <b>-</b>
              <b>{`${awayTeamScore}`}</b>
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
            <PredictResult matchId={matchId} />
          ) : (
            !isMatchPublished ? (
              <FinalResult matchId={matchId} />
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
