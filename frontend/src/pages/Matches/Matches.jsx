import { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './Matches.module.scss'
import FinishedCard from '../../components/MatchCard/FinishedMatchCard/FinishedCard'
import PredictCard from '../../components/MatchCard/PredictMatchCard/PredictCard'
import { useMatch } from '../../hooks/useMatch'

const Matches = () => {
  const { matches } = useTotoContext()
  const { user } = useAuthContext()
  const { getMatches } = useMatch()

  useEffect(() => {
    if (user) {
      getMatches()
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
