/* eslint-disable no-nested-ternary */
import { useState } from 'react'
import { successToast } from '../../utils/toast'
import styles from './MatchCard.module.scss'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useMatchContext } from '../../hooks/useMatchContext'
import { useModalContext } from '../../hooks/useModalContext'
import FinalResult from './FinalResult'
import PredictResult from './PredictResult'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

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
  const [deleteModal, setDeleteModal] = useState(false)
  const { user } = useAuthContext()
  const { dispatch } = useMatchContext()
  const { dispatchModal } = useModalContext()
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

  const handleDelete = async (id) => {
    const response = await fetch(`/api/match/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      successToast(json.message)
      dispatch({ type: 'DELETE_MATCH', payload: json })
    }

    setIsDeleted(true)
  }

  const modalProps = {
    text: 'Confirm to delete match!',
    confirm: async () => {
      await handleDelete(_id)
      dispatchModal({ type: 'CLOSE_MODAL' })
    },
    cancel: () => dispatchModal({ type: 'CLOSE_MODAL' }),
  }

  return (
    <div className={styles.container}>
      {deleteModal && (
      <ConfirmationModal
        text="Confirm to delete match!"
        // handleConfirmation={() => handleDelete(_id)}
        // handleCancelation={() => setDeleteModal(false)}
      />
      )}
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
              <PredictResult matchId={_id} />
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
