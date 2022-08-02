import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import LeaderBoardCard from '../../components/LeaderBoardCard/LeaderBoardCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './LeaderBoard.module.scss'

const LeaderBoard = () => {
  const { user } = useAuthContext()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch('/api/user/all', {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()
      console.log(json)
      if (response.ok) {
        setUsers(json)
      }

      if (!response.ok) {
        toast.error(json.error, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        })
      }
    }

    if (user) {
      getAllUsers()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <div className={styles.users}>
        {users.length ? (
          <div className={styles.userWrapper}>
            <h1>Top Predictors</h1>
            {users.map((obj) => (
              <LeaderBoardCard avatar={obj.avatar} email={obj.email} points={obj.points} key={obj.email} />
            ))}
          </div>
        ) : (<h1>No upcoming matches to be found</h1>)}
      </div>
    </div>
  )
}

export default LeaderBoard