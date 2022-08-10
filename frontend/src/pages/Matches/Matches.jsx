import { useEffect } from 'react'
import { errorToast } from '../../utils/toast'
import MatchCard from '../../components/MatchCard/MatchCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useMatchContext } from '../../hooks/useMatchContext'
import styles from './Matches.module.scss'

const Matches = () => {
  const { matches, dispatch } = useMatchContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const getAllMatches = async () => {
      const response = await fetch(`/api/match/all?timezone=${timezone}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      const json = await response.json()

      const {
        status, data, message,
      } = json

      if (status === 'success') {
        dispatch({ type: 'SET_MATCHES', payload: data })
      } else {
        errorToast(message)
      }
    }

    if (user) {
      getAllMatches()
    }
  }, [user, dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.matches}>
        <div className={styles.matchWrapper}>
          <h1>Upcoming games</h1>
          {matches && matches.map((match) => (
            !match.isMatchFinished && (
              <MatchCard key={match._id} {...match} />
            )
          ))}
        </div>
        <div className={styles.matchWrapper}>
          <h1>Finished games</h1>
          {matches && matches.map((match) => (
            (match.isMatchFinished && (match.homeTeamScore || match.awayTeamScore)) ? (
              <MatchCard key={match._id} {...match} />
            )
              : null
          ))}
        </div>
      </div>
    </div>
  )
}

export default Matches
