import { useTranslation } from 'react-i18next'
import styles from './AdminMatchCard.module.scss'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useModalContext } from '../../../hooks/useModalContext'
import FinalResult from './FinalResult'
import { useMatch } from '../../../hooks/useMatch'

const AdminMatchCard = ({
  homeTeam,
  awayTeam,
  _id,
  title,
  userStartTime,
  userStartDate,
  userTimeTillGame,
}) => {
  const { user } = useAuthContext()
  const { dispatchModal } = useModalContext()
  const { deleteMatch } = useMatch()
  const { t } = useTranslation()

  const isAdmin = user?.roles?.includes(2000)

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
      <FinalResult matchId={_id} isAdmin={isAdmin} />
    </div>
  )
}

export default AdminMatchCard
