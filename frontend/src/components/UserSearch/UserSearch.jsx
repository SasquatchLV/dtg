import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../hooks/useUser'
import styles from './UserSearch.module.scss'

const UserSearch = () => {
  const [email, setEmail] = useState('')
  const { t } = useTranslation()
  const { getUser } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    getUser(email)
    setEmail('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{t('user.findUser')}</h3>
      <label>{t('user.email')}</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder={t('placeholder.email')}
        required
      />
      <button
        className={styles.findBtn}
        type="submit"
        disabled={!email}
      >
        {t('user.find')}
      </button>
    </form>
  )
}

export default UserSearch
