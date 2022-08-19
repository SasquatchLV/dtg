import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './Matches.module.scss'
import FinishedCard from '../../components/MatchCard/FinishedMatchCard/FinishedCard'
import PredictCard from '../../components/MatchCard/PredictMatchCard/PredictCard'
import { useMatch } from '../../hooks/useMatch'
import { useSeason } from '../../hooks/useSeason'

const Matches = () => {
  const { matches, ongoingSeason } = useTotoContext()
  const { user } = useAuthContext()
  const { getMatches } = useMatch()
  const { getSeasons } = useSeason()
  const { t } = useTranslation()

  useEffect(() => {
    if (user) {
      getMatches()
      getSeasons()
    }
  }, [user])

  return (
    <div className={styles.container}>
      {ongoingSeason ? (
        <div className={styles.matches}>
          <div className={styles.matchWrapper}>
            <h2>{t('matches.upcoming')}</h2>
            {matches?.map((match) => (
              !match.isMatchFinished ? (
                <PredictCard key={match._id} {...match} />
              ) : null
            ))}
          </div>
          <div className={styles.matchWrapper}>
            <h2>{t('matches.finished')}</h2>
            {matches?.map((match) => (
              (match.isMatchFinished && (match.homeTeamScore || match.awayTeamScore)) ? (
                <FinishedCard key={match._id} {...match} />
              ) : null
            ))}
          </div>
        </div>
      ) : (
        <h2>{t('matches.noSeason')}</h2>
      )}
    </div>
  )
}

export default Matches
