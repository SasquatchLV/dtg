import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import { useAuthContext } from '../../../hooks/useAuthContext'
import styles from './PreviousStandings.module.scss'
import { errorToast } from '../../../utils/toast'
import UsersParticipating from '../../../components/UsersParticipating/UsersParticipating'

const PreviousStandings = ({ seasonYear }) => {
  const [groupA, setGroupA] = useState([])
  const [groupB, setGroupB] = useState([])
  const [topThreeUsers, setTopThreeUsers] = useState([])
  const [overallRanking, setOverallRanking] = useState([])
  const [matches, setMatches] = useState([])
  const [showingUser, setShowingUser] = useState([])
  const { user } = useAuthContext()
  const { t } = useTranslation()

  const getSeason = async () => {
    const response = await fetch(`/api/season/${seasonYear}`)

    const { data: { season: { users, teams, matches: seasonMatches } }, status, message } = await response.json()
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
      setMatches(seasonMatches)
      setTopThreeUsers(users)
      const sortedRankings = sortRankingsForTeams(teams)
      setOverallRanking(sortedRankings)
    } else {
      errorToast(message)
    }
  }

  const totalGames = (w, l, wo, lo) => {
    const total = w + l + wo + lo

    return total
  }

  const determinePlacement = (index) => {
    let link = null

    if (index === 0) {
      link = 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png'
    } else if (index === 1) {
      link = 'https://cdn-icons-png.flaticon.com/512/2583/2583319.png'
    } else if (index === 2) {
      link = 'https://cdn-icons-png.flaticon.com/512/2583/2583434.png'
    }

    return link
  }

  const determineWinner = (team1, team2) => {
    let winner = 'home'
    const awayWon = team1 < team2

    if (awayWon) {
      winner = 'away'
    }

    return winner
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
          <h4>{t('standings.groupA')}</h4>
          <table>
            <thead>
              <tr>
                <th className="hidden">A</th>
                <th>{t('standings.country')}</th>
                <th data-tip data-for="wins">W</th>
                <th data-tip data-for="loses">L</th>
                <th data-tip data-for="winsOvertime">WO</th>
                <th data-tip data-for="losesOvertime">LO</th>
                <th data-tip data-for="gamesPlayed">GP</th>
                <th data-tip data-for="points">P</th>
              </tr>
            </thead>
            <tbody>
              {groupA?.map(({
                _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points,
              }) => (
                <tr key={_id} className={styles.groupRow}>
                  <td><img src={flag} alt="flag" className={styles.flag} /></td>
                  <td>{country}</td>
                  <td>{gamesWon}</td>
                  <td>{gamesLost}</td>
                  <td>{gamesWO}</td>
                  <td>{gamesLO}</td>
                  <td>{totalGames(gamesWon, gamesLost, gamesWO, gamesLO)}</td>
                  <td>{points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.teamWrapper}>
          <h4>{t('standings.groupB')}</h4>
          <table>
            <thead>
              <tr>
                <th className="hidden">A</th>
                <th>{t('standings.country')}</th>
                <th data-tip data-for="wins">W</th>
                <th data-tip data-for="loses">L</th>
                <th data-tip data-for="winsOvertime">WO</th>
                <th data-tip data-for="losesOvertime">LO</th>
                <th data-tip data-for="gamesPlayed">GP</th>
                <th data-tip data-for="points">P</th>
              </tr>
            </thead>
            <tbody>
              {groupB?.map(({
                _id, country, flag, gamesWon, gamesLost, gamesWO, gamesLO, points,
              }) => (
                <tr key={_id} className={styles.groupRow}>
                  <td><img src={flag} alt="flag" className={styles.flag} /></td>
                  <td>{country}</td>
                  <td>{gamesWon}</td>
                  <td>{gamesLost}</td>
                  <td>{gamesWO}</td>
                  <td>{gamesLO}</td>
                  <td>{totalGames(gamesWon, gamesLost, gamesWO, gamesLO)}</td>
                  <td>{points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.matchWrapper}>
          <table className="table">
            <thead>
              <tr>
                <th>Bettors</th>
                <th>Game Type</th>
                <th>Home Team</th>
                <th>Away Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => {
                const {
                  homeTeamScore, awayTeamScore, _id, usersParticipating,
                } = match

                // const sortedUsers = usersParticipating.map((player) => ({
                //   ...player,
                //   pointsEarned: player.pointsEarned?.slice(1),
                // })).sort((a, b) => b.pointsEarned - a.pointsEarned)

                return (
                  <>
                    <tr>
                      <td>
                        <button
                          className={styles.participators}
                          onClick={() => {
                            if (showingUser.includes(_id)) {
                              const newShowingUser = showingUser.filter(
                                (id) => id !== _id,
                              )
                              setShowingUser(newShowingUser)
                            } else {
                              setShowingUser([...showingUser, _id])
                            }
                          }}
                        >
                          <img
                            src="/bets.png"
                            alt="bets"
                            className={styles.participatorImg}
                          />
                          <span>{match.usersParticipating.length}</span>
                        </button>
                      </td>
                      <td>
                        {match.title}
                      </td>
                      <td className={determineWinner(homeTeamScore, awayTeamScore) === 'home' ? 'bolder' : ''}>
                        {match.homeTeam.country}
                      </td>
                      <td className={determineWinner(homeTeamScore, awayTeamScore) === 'away' ? 'bolder' : ''}>
                        {match.awayTeam.country}
                      </td>
                      <td className={styles.matchScore}>
                        <span className={determineWinner(homeTeamScore, awayTeamScore) === 'home' ? 'bolder' : ''}>
                          {homeTeamScore}
                        </span>
                        <span>
                          -
                        </span>
                        <span className={determineWinner(homeTeamScore, awayTeamScore) === 'away' ? 'bolder' : ''}>
                          {awayTeamScore}
                        </span>
                        {match.overTime && (
                        <span>
                          OT
                        </span>
                        )}
                      </td>
                    </tr>
                    {showingUser?.includes(_id) && (
                    <tr>
                      <th scope="row" colSpan="5">
                        <UsersParticipating users={usersParticipating} />
                      </th>
                    </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.overallWrapper}>
          <h4>{t('standings.overall')}</h4>
          <table>
            <thead>
              <tr>
                <th className="hidden">-</th>
                <th>{t('standings.rank')}</th>
                <th>{t('standings.country')}</th>
              </tr>
            </thead>
            <tbody>
              {overallRanking.map(({ country, flag, _id }, index) => (
                <tr className={styles.overallRow} key={_id}>
                  <td>{index + 1}</td>
                  <td><img src={flag} alt="flag" className={styles.flagSmall} /></td>
                  <td>{country}</td>
                  <td>
                    <img
                      className={index > 2 ? styles.notVisible : styles.icon}
                      src={determinePlacement(index)}
                      alt="icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {topThreeUsers.length ? (
          <div className={styles.overallWrapper}>
            <h4>{t('standings.topPredictors')}</h4>
            <table>
              <thead>
                <tr>
                  <th className={styles.notVisible}>-</th>
                  <th>Email</th>
                  <th>{t('standings.points')}</th>
                  <th>Place</th>
                </tr>
              </thead>
              <tbody>
                {topThreeUsers.map(({
                  email, avatar, points, _id,
                }, index) => (
                  <tr key={_id} className={styles.userRow}>
                    <td className={styles.avatarCell}><img src={avatar} alt="avatar" className={styles.avatar} /></td>
                    <td>{email}</td>
                    <td>{points}</td>
                    <td><img className={styles.icon} src={determinePlacement(index)} alt="icon" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <h4>{t('standings.noPredictors')}</h4>}
      </div>
      <ReactTooltip id="wins" place="top" effect="solid">
        Wins
      </ReactTooltip>
      <ReactTooltip id="loses" place="top" effect="solid">
        Loses
      </ReactTooltip>
      <ReactTooltip id="winsOvertime" place="top" effect="solid">
        Wins Overtime
      </ReactTooltip>
      <ReactTooltip id="losesOvertime" place="top" effect="solid">
        Loses Overtime
      </ReactTooltip>
      <ReactTooltip id="gamesPlayed" place="top" effect="solid">
        Games Played
      </ReactTooltip>
      <ReactTooltip id="points" place="top" effect="solid">
        Points
      </ReactTooltip>
    </div>
  )
}

export default PreviousStandings
