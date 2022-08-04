import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { errorToast } from '../../utils/toast'
import MatchCard from '../../components/MatchCard/MatchCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Matches.module.scss'

const Matches = () => {
  const [unfinishedMatches, setUnfinishedMatches] = useState([])
  const [finishedMatches, setFinishedMatches] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const getAllMatches = async () => {
      const response = await fetch(`/api/match/all?timezone=${timezone}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()

      if (response.ok) {
        setFinishedMatches(json.filter((match) => match.isMatchFinished && match.homeTeamScore && match.awayTeamScore))
        setUnfinishedMatches(json.filter((match) => !match.isMatchFinished))
      }

      if (!response.ok) {
        errorToast(json.error)
      }
    }

    if (user) {
      getAllMatches()
    }
  }, [user])

  return (
    <div className={styles.container}>
      <div className={styles.matches}>
        {unfinishedMatches.length ? (
          <div className={styles.matchWrapper}>
            <h1>Upcoming games</h1>
            {unfinishedMatches.map(
              ({
                startingTime,
                homeTeam,
                homeTeamScore,
                awayTeam,
                awayTeamScore,
                _id,
                usersParticipating,
                title,
                overTime,
                userStartDate,
                userStartTime,
                isMatchFinished,
                userTimeTillGame,
              }) => (
                <MatchCard
                  startingTime={startingTime}
                  homeTeam={homeTeam}
                  homeTeamScore={homeTeamScore}
                  awayTeam={awayTeam}
                  awayTeamScore={awayTeamScore}
                  matchId={_id}
                  usersParticipating={usersParticipating}
                  title={title}
                  key={_id}
                  ot={overTime}
                  userStartDate={userStartDate}
                  userStartTime={userStartTime}
                  isMatchFinished={isMatchFinished}
                  userTimeTillGame={userTimeTillGame}
                />
              ),
            )}
          </div>
        ) : (
          <h1>No upcoming matches to be found</h1>
        )}
        {finishedMatches.length ? (
          <div className={styles.matchWrapper}>
            <h1>Finished games</h1>
            {finishedMatches.map(
              ({
                startingTime,
                homeTeam,
                homeTeamScore,
                awayTeam,
                awayTeamScore,
                _id,
                usersParticipating,
                title,
                overTime,
                userStartDate,
                userStartTime,
                isMatchFinished,
                userTimeTillGame,
              }) => (
                <MatchCard
                  startingTime={startingTime}
                  homeTeam={homeTeam}
                  homeTeamScore={homeTeamScore}
                  awayTeam={awayTeam}
                  awayTeamScore={awayTeamScore}
                  matchId={_id}
                  usersParticipating={usersParticipating}
                  title={title}
                  key={_id}
                  ot={overTime}
                  userStartDate={userStartDate}
                  userStartTime={userStartTime}
                  isMatchFinished={isMatchFinished}
                  userTimeTillGame={userTimeTillGame}
                />
              ),
            )}
          </div>
        ) : (
          <h1>No finished matches to be found</h1>
        )}
      </div>
    </div>
  )
}

export default Matches
