import { useEffect } from 'react'
import LeaderBoardCard from '../../components/LeaderBoardCard/LeaderBoardCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './LeaderBoard.module.scss'
import { useUser } from '../../hooks/useUser'

const LeaderBoard = () => {
  const { user } = useAuthContext()
  const { users, prizepool } = useTotoContext()
  const { getPrizePoolAndUsers } = useUser()

  useEffect(() => {
    if (user) {
      getPrizePoolAndUsers()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <h4 className={styles.prizePool}>
        {`Prize Pool: ${prizepool}€`}
      </h4>
      <div className={styles.users}>
        {users?.length ? (
          <div className={styles.userWrapper}>
            <h1>Participants</h1>
            <div className={styles.infoWrapper}>
              <span className={styles.info}>User</span>
              <span className={styles.info}>Last games</span>
              <span className={styles.info}>Points</span>
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
          <h1>No users</h1>
        )}
      </div>
    </div>
  )
}

export default LeaderBoard
