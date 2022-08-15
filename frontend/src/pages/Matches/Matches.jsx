import { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './Matches.module.scss'
import FinishedCard from '../../components/MatchCard/Cards/FinishedMatchCard/FinishedCard'
import PredictCard from '../../components/MatchCard/Cards/PredictMatchCard/PredictCard'
import { useMatch } from '../../hooks/useMatch'

const Matches = () => {
  const { matches } = useTotoContext()
  const { user } = useAuthContext()
  const { getAllMatches } = useMatch()

  useEffect(() => {
    if (user) {
      getAllMatches()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <div className={styles.matches}>
        <div className={styles.matchWrapper}>
          <h1>Upcoming games</h1>
          {matches?.map((match) => (
            !match.isMatchFinished ? (
              <PredictCard key={match._id} {...match} />
            ) : null
          ))}
        </div>
        <div className={styles.matchWrapper}>
          <h1>Finished games</h1>
          {matches?.map((match) => (
            (match.isMatchFinished && (match.homeTeamScore || match.awayTeamScore)) ? (
              <FinishedCard key={match._id} {...match} />
            ) : null
          ))}
        </div>
      </div>
    </div>
  )
}

export default Matches
