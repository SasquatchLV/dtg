/* eslint-disable no-nested-ternary */
import { useState } from 'react'
import { successToast } from '../../utils/toast'
import styles from './MatchCard.module.scss'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useMatchContext } from '../../hooks/useMatchContext'
import { useModalContext } from '../../hooks/useModalContext'
import FinalResult from './FinalResult'
import PredictResult from './PredictResult'

const MatchCard = ({
  startingTime,
  homeTeam,
  homeTeamScore,
  awayTeam,
  awayTeamScore,
  _id,
  usersParticipating,
  title,
  ot,
  userStartTime,
  userStartDate,
  isMatchFinished,
  userTimeTillGame,
}) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const { user } = useAuthContext()
  const { dispatch } = useMatchContext()
  const { dispatchModal } = useModalContext()
  const isAdmin = user?.roles?.includes(2000)

  const alreadyParticipated = usersParticipating.some(({ email }) => email === user.email)
  const indexOfUser = usersParticipating?.findIndex(({ email }) => email === user.email)
  const usersBet = usersParticipating[indexOfUser]
  const hasMatchScore = homeTeamScore || awayTeamScore
  const isMatchPublished = isMatchFinished && hasMatchScore && isAdmin
  const handleDelete = async () => {
    const response = await fetch(`/api/match/${_id}`, {
      method: 'DELETE',
    })

    const { data, message, status } = await response.json()

    if (status === 'success') {
      successToast(message)
      dispatch({ type: 'DELETE_MATCH', payload: data })
    }

    setIsDeleted(true)
  }

  const modalProps = {
    text: 'Confirm to delete match!',
    confirm: async () => {
      await handleDelete()
      dispatchModal({ type: 'CLOSE_MODAL' })
    },
    cancel: () => dispatchModal({ type: 'CLOSE_MODAL' }),
  }

  return (
    <div className={styles.container}>
      {isAdmin
        && (!isDeleted ? (
          <button
            className={styles.delete}
            onClick={() => dispatchModal({ type: 'OPEN_MODAL', payload: modalProps })}
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
            !isAdmin ? (
              <>
                <PredictResult matchId={_id} />
              </>
            ) : (
              <h4>Admins can`t participate</h4>
            )
          ) : !isMatchPublished ? (
            isAdmin && <FinalResult matchId={_id} />
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
