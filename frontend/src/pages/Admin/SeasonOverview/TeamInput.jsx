import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './TeamInput.module.scss'
import { useSeason } from '../../../hooks/useSeason'

const TeamInput = () => {
  const [countryName, setCountryName] = useState('')
  const [countryFlag, setCountryFlag] = useState('')
  const { getTeamSelection, addTeamToSelection } = useSeason()
  const { t } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addTeamToSelection(countryName, countryFlag)

    setCountryFlag('')
    setCountryName('')

    getTeamSelection()
  }

  return (
    <form className={styles.teamForm} onSubmit={handleSubmit}>
      <h3>{t('seasons.newTeam')}</h3>
      <label>{t('seasons.teamName')}</label>
      <input
        type="text"
        onChange={(e) => setCountryName(e.target.value)}
        value={countryName}
        placeholder={t('placeholder.country')}
        required
      />
      <label>{t('seasons.teamFlag')}</label>
      <input
        type="text"
        onChange={(e) => setCountryFlag(e.target.value)}
        value={countryFlag}
        placeholder={t('placeholder.link')}
        required
      />
      <button
        className={styles.addBtn}
        type="submit"
        disabled={!countryName || !countryFlag}
      >
        {t('seasons.add')}
      </button>
    </form>
  )
}

export default TeamInput
