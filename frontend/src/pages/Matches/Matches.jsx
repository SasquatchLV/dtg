import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTotoContext } from '../../hooks/useTotoContext'
import styles from './Matches.module.scss'
import FinishedCard from '../../components/MatchCard/FinishedMatchCard/FinishedCard'
import PredictCard from '../../components/MatchCard/PredictMatchCard/PredictCard'
import { useMatch } from '../../hooks/useMatch'
import { useSeason } from '../../hooks/useSeason'
import { useUser } from '../../hooks/useUser'

const Matches = () => {
  const {
    matches, ongoingSeason, users, prizepool,
  } = useTotoContext()
  const { getPrizePoolAndUsers } = useUser()
  const { user } = useAuthContext()
  const { getMatches } = useMatch()
  const { getSeasons } = useSeason()
  const { t } = useTranslation()

  const determineStyle = (game) => {
    const style = {
      backgroundColor: '#e0d315',
    }

    if (game === '0p') {
      style.backgroundColor = '#E44D2E'
    } else if (game === '1p') {
      style.backgroundColor = '#9af3b4'
    } else if (game === '2p') {
      style.backgroundColor = '#03C03C'
    }

    return style
  }

  useEffect(() => {
    if (user) {
      getMatches()
      getSeasons()
      getPrizePoolAndUsers()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <div className={styles.topUsers}>
        {users.map(({ avatar, email }, index) => (index <= 2 ? (
          <div className={styles.topUserBox}>
            <span className={styles.topUserText}>{`${index + 1}#`}</span>
            <img src={avatar} className={styles.topUserIcon} alt="avatar" />
            <span className={styles.topUserText}>{email}</span>
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
      <div className={styles.userContainer}>
        <div className={styles.prizePool}>
          <img src="https://cdn-icons-png.flaticon.com/512/3112/3112946.png" alt="trophy" className={styles.trophy} />
          <h4>{`${t('leaderBoard.prize')} ${prizepool}€`}</h4>
        </div>
        <h3 className={styles.title}>TOP 10</h3>
        <table className={styles.userTable}>
          <tr className={styles.userTh}>
            <th>-</th>
            <th>{t('leaderBoard.user')}</th>
            <th>{t('leaderBoard.points')}</th>
          </tr>
          {users.map(({
            avatar, email, points, lastFiveGames,
          }, index) => (index < 10 ? (
            <tr>
              <td><img src={avatar} className={styles.tableIcon} alt="avatar" /></td>
              <td>{email}</td>
              <td>{points}</td>
            </tr>
          ) : null))}
        </table>
      </div>
    </div>
  )
}

export default Matches
