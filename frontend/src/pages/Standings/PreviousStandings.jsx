import { useState, useEffect } from 'react'
import TeamsCard from '../../components/TeamsCard/TeamsCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './PreviousStandings.module.scss'
import { errorToast } from '../../utils/toast'
import RankingCard from '../../components/RankingCard/RankingCard'

const PreviousStandings = ({ seasonYear }) => {
  const [season, setSeason] = useState({})
  const [groupA, setGroupA] = useState([])
  const [groupB, setGroupB] = useState([])
  const [matches, setMatches] = useState([])
  const [overallRanking, setOverallRanking] = useState([])
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()

  const getSeason = async (year) => {
    const response = await fetch(`/api/season/${year}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    const sortRankingsForTeams = (teamArr) => {
      const sortedEliminatedTeams = teamArr.filter(({ position }) => position === 'eliminated')
      const sortedPlayoffTeams = teamArr.filter(
        (team) => team.position !== 'eliminated',
      ).sort((a, b) => a.position - b.position)

      const sortedArr = [...sortedPlayoffTeams, ...sortedEliminatedTeams]

      return sortedArr
    }

    if (response.ok) {
      setSeason(json)
      setGroupA(json.teams.filter(({ group }) => group === 'A'))
      setGroupB(json.teams.filter(({ group }) => group === 'B'))
      setMatches(json.matches)
      setUsers(json.users)

      const sortedRankings = sortRankingsForTeams(json.teams)

      setOverallRanking(sortedRankings)
    }

    if (!response.ok) {
      errorToast('Can`t load')
    }
  }

  useEffect(() => {
    if (user) {
      getSeason(seasonYear)
    }
  }, [user])

  return (
    <div className={styles.container}>
      <div className={styles.teamWrapper}>
        <h4>GROUP A</h4>
        <div className={styles.teamData}>
          <span>Country</span>
          <span>Won</span>
          <span>Lost</span>
          <span>WO</span>
          <span>LO</span>
          <span>GP</span>
          <span>Points</span>
        </div>
        {groupA.map(({
          _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points,
        }) => (
          <TeamsCard
            key={_id}
            _id={_id}
            country={country}
            flag={flag}
            gamesWon={gamesWon}
            gamesLost={gamesLost}
            gamesWO={gamesWO}
            gamesLO={gamesLO}
            points={points}
            deletable={false}
          />
        ))}
      </div>
      <div className={styles.teamWrapper}>
        <h4>GROUP B</h4>
        <div className={styles.teamData}>
          <span>Country</span>
          <span>Won</span>
          <span>Lost</span>
          <span>WO</span>
          <span>LO</span>
          <span>GP</span>
          <span>Points</span>
        </div>
        {groupB.map(({
          _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points,
        }) => (
          <TeamsCard
            key={_id}
            _id={_id}
            country={country}
            flag={flag}
            gamesWon={gamesWon}
            gamesLost={gamesLost}
            gamesWO={gamesWO}
            gamesLO={gamesLO}
            points={points}
            deletable={false}
          />
        ))}
      </div>
      <div className={styles.teamWrapper}>
        <h4>OVERALL STANDINGS</h4>
        <div className={styles.rankingData}>
          <span>Rank</span>
          <span>Country</span>
        </div>
        {overallRanking.map(({ country, flag }, index) => (
          <RankingCard
            key={Math.random(185)}
            country={country}
            flag={flag}
            ranking={index + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default PreviousStandings
