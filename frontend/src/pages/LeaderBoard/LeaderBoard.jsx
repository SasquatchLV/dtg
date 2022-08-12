import { useEffect, useState } from 'react'
import LeaderBoardCard from '../../components/LeaderBoardCard/LeaderBoardCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUserContext } from '../../hooks/useUserContext'
import styles from './LeaderBoard.module.scss'
import { useUser } from '../../hooks/useUser'

const LeaderBoard = () => {
  const { user } = useAuthContext()
  const { users, prizepool } = useUserContext()
  const { getPrizePoolAndUsers } = useUser()

  useEffect(() => {
    if (user) {
      getPrizePoolAndUsers()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <h4>
        Prize Pool:
        {' '}
        {prizepool}
        €
      </h4>
      <div className={styles.users}>
        {users?.length ? (
          <div className={styles.userWrapper}>
            <h1>Top Predictors</h1>
            {users.map((obj) => (
              <LeaderBoardCard
                avatar={obj.avatar}
                email={obj.email}
                points={obj.points}
                key={obj.email}
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
