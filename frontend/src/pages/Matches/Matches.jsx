import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './Matches.module.scss'
import FinishedCard from '../../components/MatchCard/FinishedMatchCard/FinishedCard'
import PredictCard from '../../components/MatchCard/PredictMatchCard/PredictCard'
import { useMatch } from '../../hooks/useMatch'
import { useSeason } from '../../hooks/useSeason'
import Sidebar from '../../components/Sidebar/Sidebar'

const Matches = () => {
  const {
    matches, ongoingSeason, users,
  } = useTotoContext()
  const { user } = useAuthContext()
  const { getMatches } = useMatch()
  const { getSeasons } = useSeason()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const isAdmin = user?.roles?.includes(2000)

  const formatName = (name) => {
    if (!name) {
      return null
    }

    const names = name?.split(' ')
    const lastName = names[names.length - 1].toUpperCase()
    let formattedName = name

    if (names.length > 1) {
      formattedName = `${name[0][0].toUpperCase()}. ${lastName[0] + lastName.slice(1).toLowerCase()}`
    }

    return formattedName
  }

  useEffect(() => {
    if (user) {
      getMatches()
      getSeasons()
    }
  }, [user])

  return (
    <>
      {!matches && (
        <div className={styles.container}>
          <div className={styles.matchContainer}>
            <div className={styles.noMatches}>
              <h2>{t('matches.noMatches')}</h2>
              {isAdmin && (
              <button
                className={styles.adminBtn}
                onClick={() => navigate('/admin')}
              >
                Admin panel
              </button>
              )}
            </div>
          </div>
          <Sidebar />
        </div>
      )}

      {matches && (
      <div className={styles.container}>
        <div className={styles.topUsers}>
          {users?.map(({ avatar, fullName, _id }, index) => (index <= 2 ? (
            <div className={styles.topUserBox} key={_id}>
              <span className={styles.topUserText}>{`${index + 1}#`}</span>
              <img src={avatar} className={styles.topUserIcon} alt="avatar" />
              <span className={styles.topUserText}>{formatName(fullName)}</span>
            </div>
          ) : null))}
        </div>
        <div className={styles.matchContainer}>
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
        <Sidebar />
      </div>
      )}
    </>
  )
}

export default Matches
