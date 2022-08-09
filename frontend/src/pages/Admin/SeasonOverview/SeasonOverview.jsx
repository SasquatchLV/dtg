import { useState, useEffect } from 'react'
import styles from './SeasonOverview.module.scss'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { errorToast } from '../../../utils/toast'

const SeasonOverview = () => {
  const [seasonsYear, setSeasonsYear] = useState(0)
  const [teamSelection, setTeamSelection] = useState([])
  const [selectedTeams, setSelectedTeams] = useState([])
  const [seasonAlreadyRunning, setSeasonAlreadyRunning] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { user } = useAuthContext()

  const getAllSeasons = async () => {
    const response = await fetch('/api/season/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      json.some(({ status }) => status === 'active' && setSeasonAlreadyRunning(true))
    }

    if (!response.ok) {
      errorToast('Can`t load')
    }
  }

  const startSeason = async () => {
    const response = await fetch('/api/season/new', {
      method: 'POST',
      body: JSON.stringify({ seasonsYear, selectedTeams }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })

    await response.json()
    setSubmitted(true)
  }

  const finishSeason = async () => {
    const response = await fetch('/api/season/finish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })

    await response.json()
    setSubmitted(true)
  }

  const getTeamSelection = async () => {
    const response = await fetch('/api/season/seasonTeams', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      setTeamSelection(json)
    }

    if (!response.ok) {
      errorToast('Can`t load')
    }
  }

  useEffect(() => {
    getTeamSelection()
    getAllSeasons()
  }, [user])

  const teamAlreadySelected = (country) => selectedTeams.some((team) => team.country === country)

  const groupACount = selectedTeams.filter(({ group }) => group === 'A').length
  const groupBCount = selectedTeams.filter(({ group }) => group === 'B').length

  const handleSelection = (group, { country, flag }) => {
    const selectedTeam = { group, country, flag }

    setErrorMsg('')
    if (teamAlreadySelected(country)) {
      setSelectedTeams(selectedTeams.filter((team) => team.country !== country))
    } else if (group === 'A' && groupACount >= 8) {
      setErrorMsg('Already 8 teams in group A')
    } else if (group === 'B' && groupBCount >= 8) {
      setErrorMsg('Already 8 teams in group B')
    } else {
      setSelectedTeams([...selectedTeams, selectedTeam])
    }
  }

  const whichGroup = (country) => {
    const index = selectedTeams.findIndex((team) => team.country === country)

    if (index >= 0) {
      return selectedTeams[index].group
    }

    return null
  }

  const allHaveBeenSelected = selectedTeams.length >= 10 && selectedTeams.length <= 16

  return (
    <div className={styles.seasonOverview}>
      <div className={styles.seasonActions}>
        {!submitted ? (
          <div className={styles.seasonForm}>
            <h3>Start new season</h3>
            <label>Year</label>
            <input
              type="number"
              onChange={(e) => setSeasonsYear(e.target.value)}
              value={seasonsYear}
              placeholder="year..."
              required
            />
            {allHaveBeenSelected ? (
              <div className={styles.selectedContainer}>
                <h6>Group A</h6>
                <div className={styles.selectedWrapper}>
                  {selectedTeams.map(({ group, flag }) => (group === 'A'
                    ? <img src={flag} alt="flag" className={styles.smallFlag} key={flag} />
                    : ''))}
                </div>
                <h6>Group B</h6>
                <div className={styles.selectedWrapper}>
                  {selectedTeams.map(({ group, flag }) => (group === 'B'
                    ? <img src={flag} alt="flag" className={styles.smallFlag} key={flag} />
                    : ''))}
                </div>
              </div>
            ) : (
              <h5 className={styles.err}>
                Please select at least 10 teams,
                <br />
                not more than 16
              </h5>
            )}
            {seasonAlreadyRunning
          && (
          <h5 className={styles.err}>
            Can`t start new season, while a season is already ongoing.
            Please finish the season to start a new one!
          </h5>
          )}
            <button
              className={styles.addBtn}
              disabled={!allHaveBeenSelected || seasonsYear.length !== 4 || seasonAlreadyRunning}
              onClick={startSeason}
            >
              Start Season
            </button>
            <button
              className={styles.addBtn}
              disabled={!seasonAlreadyRunning}
              onClick={finishSeason}
            >
              Finish Season
            </button>
          </div>
        ) : (
          <h2>All good!</h2>
        )}
      </div>
      <div className={styles.selectionWrapper}>
        <h4>
          <i>
            If a team is not in the selection, start the season without it
            and afterwards add the team manually in Team Overview
          </i>
        </h4>
        <h5 className={styles.err}>{errorMsg}</h5>
        <div className={styles.selection}>
          <h3>Teams for group A</h3>
          <h5>{`${groupACount} selected`}</h5>
          <div className={styles.teamWrapper}>
            {teamSelection.map(({ flag, country, _id }) => (
              <div
                className={teamAlreadySelected(country) ? styles.selected : styles.notSelected}
                key={_id}
                onClick={() => handleSelection('A', { country, flag })}
              >
                <span className={whichGroup(country) === 'A' ? styles.selectedA : styles.selectedB}>
                  {whichGroup(country)}
                </span>
                <img src={flag} alt="flag" className={styles.flag} />
                <span>{country}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.selection}>
          <h3>Teams for group B</h3>
          <h5>{`${groupBCount} selected`}</h5>
          <div className={styles.teamWrapper}>
            {teamSelection.map(({ flag, country, _id }) => (
              <div
                className={teamAlreadySelected(country) ? styles.selected : styles.notSelected}
                key={_id}
                onClick={() => handleSelection('B', { country, flag })}
              >
                <span className={whichGroup(country) === 'A' ? styles.selectedA : styles.selectedB}>
                  {whichGroup(country)}
                </span>
                <img src={flag} alt="flag" className={styles.flag} />
                <span>{country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonOverview
