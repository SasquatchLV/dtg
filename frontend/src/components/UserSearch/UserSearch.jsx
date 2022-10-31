import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../hooks/useUser'
import styles from './UserSearch.module.scss'

const UserSearch = () => {
  const [fullName, setFullName] = useState('')
  const { t } = useTranslation()
  const { searchUser } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    searchUser(fullName)
    setFullName('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{t('user.findUser')}</h3>
      <label>{t('user.fullName')}</label>
      <input
        type="text"
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
        placeholder={t('placeholder.fullName')}
        required
      />
      <button
        className={styles.findBtn}
        type="submit"
        disabled={!fullName}
      >
        {t('user.find')}
      </button>
    </form>
  )
}

export default UserSearch
