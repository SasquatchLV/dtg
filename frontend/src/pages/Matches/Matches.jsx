import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import MatchCard from '../../components/MatchCard/MatchCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Matches.module.scss'

const Matches = () => {
  const [unfinishedMatches, setUnfinishedMatches] = useState([])
  const [finishedMatches, setFinishedMatches] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const getAllMatches = async () => {
      const response = await fetch('/api/match/all', {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const json = await response.json()

      if (response.ok) {
        const matchesWithScore = json.filter((match) => (
          match.finished && (match.homeTeamScore || match.awayTeamScore)
        ))

        setFinishedMatches(matchesWithScore)
        setUnfinishedMatches(json.filter((match) => !match.finished))
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
    <div className={styles.container}>
      <div className={styles.matches}>
        {unfinishedMatches.length ? (
          <div className={styles.matchWrapper}>
            <h1>Upcoming games</h1>
            {unfinishedMatches.map(({
              startingTime, homeTeam, homeTeamScore, awayTeam, awayTeamScore, _id, usersParticipating, title, overTime,
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
              />
            ))}
          </div>
        ) : (<h1>No upcoming matches to be found</h1>)}
        {finishedMatches.length ? (
          <div className={styles.matchWrapper}>
            <h1>Finished games</h1>
            {finishedMatches.map(({
              startingTime, homeTeam, homeTeamScore, awayTeam, awayTeamScore, _id, usersParticipating, title, overTime,
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
              />
            ))}
          </div>
        ) : <h1>No finished matches to be found</h1>}
      </div>
    </div>
  )
}

export default Matches
