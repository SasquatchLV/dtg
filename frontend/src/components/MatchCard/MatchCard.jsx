/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  formatDistance, getTime, getHours, getMinutes, format as dateFnsFormat,
} from 'date-fns'
import locale from 'date-fns/locale/lv'
import styles from './MatchCard.module.scss'
import { useMatch } from '../../hooks/useMatch'
import { useAuthContext } from '../../hooks/useAuthContext'
import FinalResult from './FinalResult'
import PredictResult from './PredictResult'

const MatchCard = ({
  startingTime,
  homeTeam,
  homeTeamScore,
  awayTeam,
  awayTeamScore,
  matchId,
  usersParticipating,
  title,
  ot,
}) => {
  const { finishMatch } = useMatch()
  const [isDeleted, setIsDeleted] = useState(false)
  const { user } = useAuthContext()

  function formatDate(data, format = 'dd.MM.yyyy HH:mm:ss') {
    const dateFull = typeof data === 'string' ? Date.parse(data) : data

    return dateFnsFormat(dateFull, format, { locale })
  }

  const fullDate = formatDate(startingTime)

  const isMatchFinished = getTime(fullDate) < getTime(new Date())

  const isAdmin = user?.roles?.includes(2000)

  const alreadyParticipated = usersParticipating.some(
    (obj) => obj.email === user.email,
  )

  const indexOfUser = usersParticipating?.findIndex(
    (obj) => obj.email === user.email,
  )

  const usersBet = usersParticipating[indexOfUser]

  const hasMatchScore = homeTeamScore || awayTeamScore

  const isMatchPublished = isMatchFinished && hasMatchScore && isAdmin

  useEffect(() => {
    if (isMatchFinished) {
      finishMatch(matchId)
    }
  }, [])

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
        {/* <h4>{dateFnsFormat(new Date(fullDate), 'HH:mm')}</h4>
        <span>{dateFnsFormat(new Date(fullDate), 'dd.MM.yyyy')}</span> */}
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
            {awayTeam.country}
          </div>
        </div>
        <span className={styles.timeRemaining}>
          {/* {isMatchFinished
            ? 'Finished'
            : formatDistance(fullDate, new Date(),
                addSuffix: true,
                includeSeconds: true,
              })} */}
        </span>
      </div>

      {!alreadyParticipated ? (
        <div className={styles.prediction}>
          {!isMatchFinished ? (
            !isAdmin ? (
              <PredictResult matchId={matchId} />
            ) : (
              <h4>Admin does no participate</h4>
            )
          ) : !isMatchPublished ? (
            isAdmin && <FinalResult matchId={matchId} />
          ) : (
            <h5>Points distributed</h5>
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
