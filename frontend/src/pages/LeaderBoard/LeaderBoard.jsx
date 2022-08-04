import { useEffect, useState } from 'react'
import LeaderBoardCard from '../../components/LeaderBoardCard/LeaderBoardCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import { errorToast } from '../../utils/toast'
import styles from './LeaderBoard.module.scss'

const LeaderBoard = () => {
  const { user } = useAuthContext()
  const [users, setUsers] = useState([])
  const [prizePool, setPrizePool] = useState(0)

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch('/api/user/all', {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()

      // Sort users by points
      const sortedUsers = json.sort((a, b) => b.points - a.points)

      if (response.ok) {
        setUsers(sortedUsers)
      }

      if (!response.ok) {
        errorToast(json.error)
      }
    }

    if (user) {
      getAllUsers()
    }
  }, [user])

  useEffect(() => {
    const getPrizePool = async () => {
      const response = await fetch('/api/user/getprizepool', {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()

      if (response.ok) {
        setPrizePool(json)
      }

      if (!response.ok) {
        errorToast(json.error)
      }
    }

    if (user) {
      getPrizePool()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <h4>
        Prize Pool:
        {' '}
        {prizePool}
        €
      </h4>
      <div className={styles.users}>
        {users.length ? (
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
          <h1>No upcoming matches to be found</h1>
        )}
      </div>
    </div>
  )
}

export default LeaderBoard
