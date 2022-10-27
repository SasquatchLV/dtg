import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import { useAuthContext } from '../../../hooks/useAuthContext'
import styles from './CurrentStandings.module.scss'
import { errorToast } from '../../../utils/toast'

const CurrentStandings = () => {
  const [groupA, setGroupA] = useState([])
  const [groupB, setGroupB] = useState([])
  const { user } = useAuthContext()
  const { t } = useTranslation()

  const getAllTeams = async () => {
    const response = await fetch('/api/team/all')
    const { data, status, message } = await response.json()
    if (status === 'success') {
      setGroupA(data.filter(({ group }) => group === 'A'))
      setGroupB(data.filter(({ group }) => group === 'B'))
    } else {
      errorToast(message)
    }
  }

  const totalGames = (w, l, wo, lo) => {
    const total = w + l + wo + lo

    return total
  }

  useEffect(() => {
    if (user) {
      getAllTeams()
    }
  }, [user])

  return (

    groupA.length ? (
      <div className={styles.container}>
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
    ) : (
      <h2>{t('standings.noActive')}</h2>
    )
  )
}

export default CurrentStandings
