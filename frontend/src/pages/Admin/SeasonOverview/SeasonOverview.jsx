import { useState, useEffect } from 'react'
import styles from './SeasonOverview.module.scss'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useModalContext } from '../../../hooks/useModalContext'
import { useTotoContext } from '../../../hooks/useTotoContext'
import { useSeason } from '../../../hooks/useSeason'
import TeamInput from './TeamInput'

const SeasonOverview = () => {
  const [seasonsYear, setSeasonsYear] = useState(0)
  const [selectedTeams, setSelectedTeams] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { user } = useAuthContext()
  const { dispatchModal } = useModalContext()

  const { ongoingSeason, teamSelection } = useTotoContext()
  const {
    getTeamSelection, startSeason, finishSeason,
  } = useSeason()

  useEffect(() => {
    getTeamSelection()
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

  const seasonStartProps = {
    text: 'Confirm to start new season!',
    confirm: async () => {
      await startSeason(seasonsYear, selectedTeams)
      dispatchModal({ type: 'CLOSE_MODAL' })
    },
    cancel: () => dispatchModal({ type: 'CLOSE_MODAL' }),
  }

  const seasonFinishProps = {
    text: 'Confirm to finish this season!',
    confirm: async () => {
      await finishSeason()
      dispatchModal({ type: 'CLOSE_MODAL' })
    },
    cancel: () => dispatchModal({ type: 'CLOSE_MODAL' }),
  }

  return (
    <div className={styles.seasonOverview}>
      <div className={styles.seasonActions}>
        <div className={styles.seasonForm}>
          <h3>Start/Finish season</h3>
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
                {selectedTeams?.map(({ group, flag }) => (group === 'A'
                  ? <img src={flag} alt="flag" className={styles.smallFlag} key={flag} />
                  : ''))}
              </div>
              <h6>Group B</h6>
              <div className={styles.selectedWrapper}>
                {selectedTeams?.map(({ group, flag }) => (group === 'B'
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
          {ongoingSeason
              && (
              <h5 className={styles.err}>
                Can`t start new season, while a season is already ongoing.
                Please finish the season to start a new one!
              </h5>
              )}
          <button
            className={styles.addBtn}
            disabled={!allHaveBeenSelected || seasonsYear.length !== 4 || ongoingSeason || submitted}
            onClick={() => {
              dispatchModal({ type: 'OPEN_MODAL', payload: seasonStartProps })
              setSubmitted(true)
            }}
          >
            Start Season
          </button>
          <button
            className={styles.addBtn}
            disabled={!ongoingSeason || submitted}
            onClick={() => {
              dispatchModal({ type: 'OPEN_MODAL', payload: seasonFinishProps })
              setSubmitted(true)
            }}
          >
            Finish Season
          </button>
        </div>
        <TeamInput />
      </div>
      {teamSelection.length ? (
        <div className={styles.selectionWrapper}>
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
      ) : null}
    </div>
  )
}

export default SeasonOverview
