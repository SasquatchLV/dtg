import { useState, useEffect, useCallback } from 'react'
import Signup from '../../components/Signup/Signup'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUser } from '../../hooks/useUser'
import styles from './AdminPanel.module.scss'

const UserOverview = () => {
  const [activeUser, setActiveUser] = useState({})
  const [selectionUsers, setSelectionUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [error, setError] = useState()
  const [writtenEmail, setWrittenEmail] = useState('')
  const { user } = useAuthContext()
  const {
    promoteUser, demoteUser, deleteUser, toggleHasPaid,
  } = useUser()

  const userFound = Object.keys(activeUser).length

  const icons = [
    {
      title: 'Promote',
      imgLink: 'https://cdn-icons-png.flaticon.com/32/3050/3050304.png',
      handleClick: () => {
        promoteUser(activeUser.email)
        setSelectedUser(activeUser.email)
      },
    },
    {
      title: 'Demote',
      imgLink: 'https://cdn-icons-png.flaticon.com/32/727/727358.png',
      handleClick: () => {
        demoteUser(activeUser.email)
        setSelectedUser(activeUser.email)
      },
    },
    {
      title: 'Payment',
      imgLink: 'https://cdn-icons-png.flaticon.com/512/126/126179.png',
      handleClick: () => {
        toggleHasPaid(activeUser.email)
        setSelectedUser(activeUser.email)
      },
    },
    {
      title: 'Delete',
      imgLink: 'https://cdn-icons-png.flaticon.com/32/3221/3221845.png',
      handleClick: () => {
        deleteUser(activeUser.email)
        setActiveUser({})
      },
    },
  ]

  const fetchUsers = useCallback(async () => {
    const response = await fetch('/api/user/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const json = await response.json()

    if (response.ok) {
      setSelectionUsers(json)
    }

    if (!response.ok) {
      setError(json.error)
    }
  }, [user])

  const fetchUser = useCallback(async (email) => {
    setError('')

    const response = await fetch(`/api/user/${email}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (response.ok) setActiveUser(json)
    if (!response.ok) {
      setError(json.error)
      setActiveUser({})
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchUsers()
    }
  }, [fetchUsers, user])

  useEffect(() => {
    if (selectedUser) {
      fetchUser(selectedUser)
      setSelectedUser('')
      setWrittenEmail('')
    }
  }, [selectedUser, fetchUser])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetchUser(writtenEmail)

    setSelectedUser('')
    setWrittenEmail('')
  }

  // Re-render user card when pressing the icons
  useEffect(() => {
    if (userFound) {
      fetchUser(activeUser.email)
    }
  }, [activeUser.email, userFound])

  return (
    <div className={styles.userOverview}>
      <div className={styles.userActions}>
        <form className={styles.userForm} onSubmit={handleSubmit}>
          {error && <p className={styles.err}>{error}</p>}
          <h3>Find user</h3>
          <label>Users e-mail:</label>
          <input
            type="text"
            onChange={(e) => setWrittenEmail(e.target.value)}
            value={writtenEmail}
            placeholder="Search..."
            required
          />
          <button className={styles.findBtn} type="submit">
            Find
          </button>
          <label>Select user</label>
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select</option>
            {selectionUsers.map(({ email }) => (
              <option value={email} key={email}>
                {email}
              </option>
            ))}
          </select>
        </form>
        <Signup />
      </div>
      {userFound ? (
        <div className={styles.userProfile}>
          <div className={styles.userLeft}>
            <img
              className={styles.userAvatar}
              src={activeUser.avatar}
              alt="avatar"
            />
            <div className={styles.leftBottom}>
              <span>{`Points: ${activeUser.points}`}</span>
            </div>
          </div>
          <div className={styles.userRight}>
            <div className={styles.userEmail}>
              <h3>{activeUser.email}</h3>
              <div className={styles.userIcons}>
                {icons.map(({ title, imgLink, handleClick }) => (
                  <div onClick={handleClick} key={title}>
                    <img
                      className={styles.icon}
                      src={imgLink}
                      alt="icon"
                    />
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <ul className={styles.userGameData}>
              <li>
                <span>Role</span>
                <span>
                  {
                    Object.keys(activeUser.roles)[
                      Object.keys(activeUser.roles).length - 1
                    ]
                  }
                </span>
              </li>
              <li>
                <span>Registered:</span>
                <span>{activeUser.createdAt.slice(0, 10)}</span>
              </li>
              <li>
                <span>Has Paid:</span>
                <span>{activeUser.hasPaid ? 'Yes' : 'No'}</span>
              </li>
            </ul>
            <img
              className={styles.paidStatus}
              src={activeUser.hasPaid ? '/paid.png' : '/notpaid.png'}
              alt="hasPaid"
            />
          </div>
        </div>
      ) : (
        <h3>
          <i>No user to show...</i>
        </h3>
      )}
    </div>
  )
}

export default UserOverview
