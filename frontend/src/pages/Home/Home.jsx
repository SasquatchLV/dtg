import { useEffect } from "react"
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"
import WorkoutDetails from "../../components/WorkoutDetails/WorkoutDetails"
import styles from "./Home.module.scss"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json })
      }
    }

    const getAllUsers = async () => {
      const response = await fetch("/api/user/all", {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()

      if (response.ok) {
        setUsers(json)
      }

      if (!response.ok) {
        console.log("Unauthorized")
      }
    }

    if (user) {
      fetchWorkouts()
      getAllUsers()
    }
  }, [dispatch, user])

  const handlePromote = async (email) => {
    await fetch(`/api/user/promote/${email}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user.token}` },
      body: JSON.stringify({ email }),
    })
  }

  const getAllUsers = async () => {
    const response = await fetch("api/user/all", {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      console.log(users)
    }

    if (!response.ok) {
      console.log("Unauthorized")
    }
  }
  

  return (
    <div className={styles.home}>
      {users &&
        users.map((user) => {
          return (
            <h3 style={{ color: "white" }} key={user._id}>
              {user.email} {Object.keys(user.roles)}
            </h3>
          )
        })}
      <div className={styles.workouts}>
        <button onClick={getAllUsers}>GET ALL USERS</button>
        <button onClick={() => handlePromote(user.email)}>PROMOTE ME</button>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  )
}

export default Home
