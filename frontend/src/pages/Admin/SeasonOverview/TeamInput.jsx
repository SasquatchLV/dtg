import { useState } from 'react'
import styles from './TeamInput.module.scss'
import { useSeason } from '../../../hooks/useSeason'

const TeamInput = () => {
  const [countryName, setCountryName] = useState('')
  const [countryFlag, setCountryFlag] = useState('')
  const { getTeamSelection, addTeamToSelection } = useSeason()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addTeamToSelection(countryName, countryFlag)

    setCountryFlag('')
    setCountryName('')

    getTeamSelection()
  }

  return (
    <form className={styles.teamForm} onSubmit={handleSubmit}>
      <h3>New team for selection</h3>
      <label>Team name:</label>
      <input
        type="text"
        onChange={(e) => setCountryName(e.target.value)}
        value={countryName}
        placeholder="type..."
        required
      />
      <label>Link to team flag:</label>
      <input
        type="text"
        onChange={(e) => setCountryFlag(e.target.value)}
        value={countryFlag}
        placeholder="type..."
        required
      />
      <button
        className={styles.addBtn}
        type="submit"
        disabled={!countryName || !countryFlag}
      >
        Add Team
      </button>
    </form>
  )
}

export default TeamInput
