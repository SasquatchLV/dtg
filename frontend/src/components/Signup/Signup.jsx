import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../hooks/useUser'
import styles from './Signup.module.scss'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const { signupUser } = useUser()
  const { t } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signupUser(email, password, fullName)

    setEmail('')
    setFullName('')
    setPassword('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{t('signup.addUser')}</h3>
      <label>{t('signup.email')}</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={t('placeholder.email')}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>{t('signup.fullName')}</label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        placeholder={t('placeholder.fullName')}
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
      />
      <label>{t('signup.password')}</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder={t('placeholder.password')}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        type="submit"
        disabled={!email || !password}
      >
        {t('signup.add')}
      </button>
    </form>
  )
}

export default Signup
