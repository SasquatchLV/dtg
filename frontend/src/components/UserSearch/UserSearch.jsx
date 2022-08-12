import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import styles from './UserSearch.module.scss'

const UserSearch = () => {
  const [email, setEmail] = useState('')
  const { getUser } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    getUser(email)
    setEmail('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Find user</h3>
      <label>Users e-mail:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Search..."
        required
      />
      <button className={styles.findBtn} type="submit">
        Find
      </button>
    </form>
  )
}

export default UserSearch
