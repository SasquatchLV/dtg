import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import styles from './UserSearch.module.scss'

const UserSearch = (props) => {
  const [email, setEmail] = useState('')
  const { setActiveUser, fetchUser } = props

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = await fetchUser(email)

    if (!user.error) {
      setActiveUser(user)
      setEmail('')
    } else {
      setActiveUser(null)
    }
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
