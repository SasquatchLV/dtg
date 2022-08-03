/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import styles from './MatchCard.module.scss'
import { useMatch } from '../../hooks/useMatch'
import { useAuthContext } from '../../hooks/useAuthContext'
import FinalResult from './Layouts/FinalResult'
import PredictResult from './Layouts/PredictResult'

const MatchCard = ({
  homeTeam,
  homeTeamScore,
  awayTeam,
  awayTeamScore,
  matchId,
  usersParticipating,
  title,
  ot,
  userStartTime,
  userStartDate,
  isMatchFinished,
  userTimeTillGame,
}) => {
  const { finishMatch } = useMatch()
  const [isDeleted, setIsDeleted] = useState(false)

  const { user } = useAuthContext()

  const isAdmin = user?.roles?.includes(2000)

  const alreadyParticipated = usersParticipating.some(
    (obj) => obj.email === user.email,
  )

  const indexOfUser = usersParticipating?.findIndex(
    (obj) => obj.email === user.email,
  )

  const usersBet = usersParticipating[indexOfUser]

  const hasMatchScore = homeTeamScore || awayTeamScore

  const handleDelete = async (id) => {
    const response = await fetch(`/api/match/${id}`, {
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

    setIsDeleted(true)
  }

  return (
    <div className={styles.container}>
      {isAdmin
        && (!isDeleted ? (
          <button
            className={styles.delete}
            onClick={() => handleDelete(matchId)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/32/3221/3221845.png"
              alt="delete"
              className={styles.deleteImg}
            />
          </button>
        ) : (
          <h4 className={styles.deleted}>Deleted</h4>
        ))}
      <div className={styles.time}>
        <h4>{userStartTime}</h4>
        <span>{userStartDate}</span>
      </div>
      <div className={styles.middle}>
        <h6>{title}</h6>
        <div className={styles.teams}>
          <div className={styles.team1}>
            <span>{homeTeam.country}</span>
            <img src={homeTeam.flag} alt="flag" className={styles.flag} />
          </div>
          {hasMatchScore ? (
            <div className={styles.resultBox}>
              <div className={styles.result}>
                <b>{`${homeTeamScore} `}</b>
                <b>-</b>
                <b>{`${awayTeamScore}`}</b>
              </div>
              {ot && <p>OT</p>}
            </div>
          ) : (
            <div className={styles.result}>
              <b> - </b>
            </div>
          )}
          <div className={styles.team2}>
            <img src={awayTeam.flag} alt="flag" className={styles.flag} />
            <span>{awayTeam.country}</span>
          </div>
        </div>
        <span className={styles.timeRemaining}>{userTimeTillGame}</span>
      </div>

      {!alreadyParticipated ? (
        <div className={styles.prediction}>
          {!isMatchFinished ? (
            <PredictResult matchId={matchId} />
          ) : !hasMatchScore ? (
            <FinalResult matchId={matchId} />
          ) : (
            <h5>Points distributed</h5>
          )}
        </div>
      ) : (
        <h5 className={styles.info}>
          <p>Predicted Score:</p>
          <p>{`${usersBet?.homeTeamScore} - ${usersBet?.awayTeamScore}`}</p>
        </h5>
      )}
    </div>
  )
}

export default MatchCard
