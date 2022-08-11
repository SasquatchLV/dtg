import { useState, useEffect } from 'react'
import TeamsCard from '../../components/TeamsCard/TeamsCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './PreviousStandings.module.scss'
import { errorToast } from '../../utils/toast'
import RankingCard from '../../components/RankingCard/RankingCard'
import UserRankingCard from '../../components/UserRankingCard/UserRankingCard'

const PreviousStandings = ({ seasonYear }) => {
  const [groupA, setGroupA] = useState([])
  const [groupB, setGroupB] = useState([])
  const [topThreeUsers, setTopThreeUsers] = useState([])
  const [overallRanking, setOverallRanking] = useState([])
  const { user } = useAuthContext()

  const getSeason = async () => {
    const response = await fetch(`/api/season/${seasonYear}`)

    const { data: { season: { users, teams } }, status, message } = await response.json()

    const sortRankingsForTeams = (teamArr) => {
      const sortedEliminatedTeams = teamArr.filter(({ position }) => position === 'eliminated')
      const sortedPlayoffTeams = teamArr.filter(
        (team) => team.position !== 'eliminated',
      ).sort((a, b) => a.position - b.position)

      const sortedArr = [...sortedPlayoffTeams, ...sortedEliminatedTeams]

      return sortedArr
    }

    if (status === 'success') {
      setGroupA(teams.filter(({ group }) => group === 'A'))
      setGroupB(teams.filter(({ group }) => group === 'B'))
      setTopThreeUsers(users)
      const sortedRankings = sortRankingsForTeams(teams)

      setOverallRanking(sortedRankings)
    } else {
      errorToast(message)
    }
  }

  useEffect(() => {
    if (user) {
      getSeason()
    }
  }, [seasonYear])

  return (
    <div className={styles.container}>
      <div className={styles.left}>
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
        {topThreeUsers.length ? (
          <div className={styles.teamWrapper}>
            <h4>TOP PREDICTORS</h4>
            <div className={styles.rankingData}>
              <span>Points</span>
              <span>User</span>
            </div>
            {topThreeUsers.map(({ email, avatar, points }, index) => (
              <UserRankingCard
                key={Math.random(185)}
                email={email}
                points={points}
                avatar={avatar}
                ranking={index + 1}
              />
            ))}
          </div>
        ) : <h4>NO PREDICTORS</h4>}
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
