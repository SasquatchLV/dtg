import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import { useAuthContext } from '../../../hooks/useAuthContext'
import styles from './PreviousStandings.module.scss'
import { errorToast } from '../../../utils/toast'

const PreviousStandings = ({ seasonYear }) => {
  const [groupA, setGroupA] = useState([])
  const [groupB, setGroupB] = useState([])
  const [topThreeUsers, setTopThreeUsers] = useState([])
  const [overallRanking, setOverallRanking] = useState([])
  const { user } = useAuthContext()
  const { t } = useTranslation()

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
                <th>A</th>
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
                <th>A</th>
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
        {topThreeUsers.length ? (
          <div className={styles.teamWrapper}>
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
      <div className={styles.right}>
        <div className={styles.overallWrapper}>
          <h4>{t('standings.overall')}</h4>
          <table>
            <thead>
              <tr>
                <th>-</th>
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
