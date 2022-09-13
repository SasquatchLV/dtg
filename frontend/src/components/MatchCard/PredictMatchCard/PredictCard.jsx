import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PredictCard.module.scss'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useModalContext } from '../../../hooks/useModalContext'
import PredictResult from './PredictResult'
import { useMatch } from '../../../hooks/useMatch'
import UsersParticipating from '../../UsersParticipating/UsersParticipating'

const PredictCard = ({
  homeTeam,
  awayTeam,
  _id,
  usersParticipating,
  title,
  userStartTime,
  userStartDate,
  userTimeTillGame,
  locked,
}) => {
  const [showingUser, setShowingUser] = useState(false)
  const { dispatchModal } = useModalContext()
  const { user } = useAuthContext()
  const { t } = useTranslation()
  const { deleteMatch } = useMatch()

  const isAdmin = user?.roles?.includes(2000)
  const hasParticipated = usersParticipating.some(({ email }) => email === user.email.toLowerCase())
  const indexOfUser = usersParticipating?.findIndex(({ email }) => email === user.email.toLowerCase())
  const usersBet = usersParticipating[indexOfUser]

  const modalProps = {
    text: t('matchCard.confirmDelete'),
    confirm: async () => {
      await deleteMatch(_id)
      dispatchModal({ type: 'CLOSE_MODAL' })
    },
    cancel: () => dispatchModal({ type: 'CLOSE_MODAL' }),
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {isAdmin && (
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
        {locked && (
        <button
          className={styles.participators}
          onClick={() => setShowingUser(!showingUser)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1232/1232140.png"
            alt="delete"
            className={styles.participatorImg}
          />
          <span>{usersParticipating.length}</span>
        </button>
        )}
        <div className={styles.time}>
          <h4>{userStartTime.split(' ')[0]}</h4>
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
              <b> - </b>
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
            <p>{t('matchCard.predictedScore')}</p>
            <p>{`${usersBet?.homeTeamScore} - ${usersBet?.awayTeamScore}`}</p>
          </h4>
        ) : <PredictResult matchId={_id} isAdmin={isAdmin} locked={locked} />}
      </div>
      {showingUser && <UsersParticipating users={usersParticipating} />}
    </div>
  )
}

export default PredictCard
