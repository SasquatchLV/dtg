import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LeaderBoardCard from '../../components/LeaderBoardCard/LeaderBoardCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './LeaderBoard.module.scss'
import { useUser } from '../../hooks/useUser'

const LeaderBoard = () => {
  const { user } = useAuthContext()
  const { users, prizepool } = useTotoContext()
  const { getPrizePoolAndUsers } = useUser()
  const { t } = useTranslation()

  useEffect(() => {
    if (user) {
      getPrizePoolAndUsers()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <h4 className={styles.prizePool}>
        {`${t('leaderBoard.prize')} ${prizepool}€`}
      </h4>
      <div className={styles.users}>
        {users?.length ? (
          <div className={styles.userWrapper}>
            <h2>{t('leaderBoard.participants')}</h2>
            <div className={styles.infoWrapper}>
              <span className={styles.info}>{t('leaderBoard.user')}</span>
              <span className={styles.info}>{t('leaderBoard.lastGames')}</span>
              <span className={styles.info}>{t('leaderBoard.points')}</span>
            </div>
            {users.map(({
              avatar, email, points, lastFiveGames,
            }) => (
              <LeaderBoardCard
                avatar={avatar}
                email={email}
                points={points}
                key={email}
                lastFiveGames={lastFiveGames}
              />
            ))}
          </div>
        ) : (
          <h1>{t('leaderBoard.noUsers')}</h1>
        )}
      </div>
    </div>
  )
}

export default LeaderBoard
