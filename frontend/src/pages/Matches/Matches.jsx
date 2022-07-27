import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import MatchCard from '../../components/MatchCard/MatchCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from '../Admin/AdminPanel.module.scss'

const Matches = () => {
  const [matches, setMatches] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const getAllMatches = async () => {
      const response = await fetch('/api/match/all', {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()

      if (response.ok) {
        setMatches(json)
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
      getAllMatches()
    }
  }, [user])

  return (
    <>
      {matches && (
      <div className={styles.matchWrapper}>
        {matches.map(({
          startingTime, homeTeam, homeTeamScore, awayTeam, awayTeamScore, _id,
        }) => (
          <MatchCard
            startingTime={startingTime}
            homeTeam={homeTeam}
            homeTeamScore={homeTeamScore}
            awayTeam={awayTeam}
            awayTeamScore={awayTeamScore}
            key={_id}
          />
        ))}
      </div>
      )}
    </>
  )
}

export default Matches
