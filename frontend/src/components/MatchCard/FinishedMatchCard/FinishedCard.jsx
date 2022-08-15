import React from 'react'
import styles from './FinishedCard.module.scss'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useModalContext } from '../../../hooks/useModalContext'
import { useMatch } from '../../../hooks/useMatch'

const FinishedCard = ({
  homeTeam,
  homeTeamScore,
  awayTeam,
  awayTeamScore,
  _id,
  usersParticipating,
  title,
  overTime,
  userStartTime,
  userStartDate,
  userTimeTillGame,
}) => {
  const { user } = useAuthContext()
  const { dispatchModal } = useModalContext()
  const { deleteMatch } = useMatch()
  const isAdmin = user?.roles?.includes(2000)
  const hasParticipated = usersParticipating.some(({ email }) => email === user.email)
  const indexOfUser = usersParticipating?.findIndex(({ email }) => email === user.email)
  const usersBet = usersParticipating[indexOfUser]

  const modalProps = {
    text: 'Confirm to delete match!',
    confirm: async () => {
      await deleteMatch(_id)
      dispatchModal({ type: 'CLOSE_MODAL' })
    },
    cancel: () => dispatchModal({ type: 'CLOSE_MODAL' }),
  }

  return (
    <div className={styles.container}>
      {isAdmin
          && (
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
          )}
      <div className={styles.time}>
        <h4>{userStartTime}</h4>
        <span>{userStartDate}</span>
      </div>
      <div className={styles.middle}>
        <h5>{title}</h5>
        <div className={styles.teams}>
          <div className={styles.team}>
            <span>{homeTeam.country}</span>
            <img src={homeTeam.flag} alt="flag" className={styles.flag} />
          </div>
          <div className={styles.resultBox}>
            <div className={styles.result}>
              <b>{`${homeTeamScore} `}</b>
              <b>-</b>
              <b>{`${awayTeamScore}`}</b>
            </div>
            {overTime && <p className={styles.overtime}>OT</p>}
          </div>
          <div className={styles.team}>
            <img src={awayTeam.flag} alt="flag" className={styles.flag} />
            <span>{awayTeam.country}</span>
          </div>
        </div>
        <span className={styles.timeRemaining}>
          {userTimeTillGame}
        </span>
      </div>
      {hasParticipated ? (
        <h4 className={styles.info}>
          <p>Predicted Score:</p>
          <p>{`${usersBet?.homeTeamScore} - ${usersBet?.awayTeamScore}`}</p>
        </h4>
      ) : (
        <h4 className={styles.info}>
          No prediction made
        </h4>
      )}
    </div>
  )
}

export default FinishedCard
