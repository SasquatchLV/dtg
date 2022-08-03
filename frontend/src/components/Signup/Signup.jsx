import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import styles from './Signup.module.scss'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signupUser } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signupUser(email, password)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add new user</h3>
      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button>Add</button>
    </form>
  )
}

export default Signup
