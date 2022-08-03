/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './UserModal.module.scss'
import { avatars } from '../../data/avatars'
import { useUser } from '../../hooks/useUser'

const UserModal = () => {
  const [avatarSelectionActive, setAvatarSelectionActive] = useState(false)
  const [passwordInputActive, setPasswordInputActive] = useState(false)
  const [newPassValue, setNewPassValue] = useState('')
  const [activeUser, setActiveUser] = useState({})
  const { user } = useAuthContext()
  const { updateAvatar, changeUserPassword } = useUser()

  const userFound = Object.keys(activeUser).length

  const fetchUser = async () => {
    const response = await fetch(`/api/user/${user.email}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (response.ok) {
      setActiveUser(json)
    }

    if (!response.ok) {
      setActiveUser({})
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleSelection = async (avatarLink) => {
    await updateAvatar(avatarLink)

    fetchUser()
  }

  const handleClickAway = () => {
    setAvatarSelectionActive(false)
    setPasswordInputActive(false)
  }

  const confirmPassword = async (e) => {
    e.preventDefault()

    setPasswordInputActive(false)

    await changeUserPassword(newPassValue)
  }

  return (
    userFound ? (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <img
            className={styles.userAvatar}
            src={activeUser.avatar}
            alt="avatar"
          />
          <button onClick={() => setAvatarSelectionActive(true)}>
            Change Avatar
          </button>
          {avatarSelectionActive && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className={styles.avatarWrapper}>
                {avatars.map((avatar) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt="avatar"
                    className={styles.avatar}
                    onClick={() => handleSelection(avatar)}
                  />
                ))}
              </div>
            </ClickAwayListener>
          )}
          {!passwordInputActive ? (
            <button onClick={() => setPasswordInputActive(true)}>
              Change Password
            </button>
          ) : (
            <ClickAwayListener onClickAway={handleClickAway}>
              <form className={styles.passwordBox} onSubmit={(e) => confirmPassword(e)}>
                <label>New Password</label>
                <input type="password" required minLength="8" maxLength="20" />
                <button
                  type="submit"
                  className={styles.confirm}
                >
                  Confirm
                </button>
              </form>
            </ClickAwayListener>
          )}
        </div>
        <div className={styles.rightSide}>
          <div className={styles.box}>
            <span className={styles.title}>
              Collected points
            </span>
            <span className={styles.points}>
              {`${activeUser.points}p`}
            </span>
          </div>
          <div className={styles.box}>
            <span className={styles.title}>
              Last five games
            </span>
            <div className={styles.gameWrapper}>
              {activeUser.lastFiveGames.map((game, i) => (
                <span
                  className={game === '0p' ? styles.lost : styles.won}
                  key={i}
                >
                  {game}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : <h1>Loading..</h1>
  )
}

export default UserModal
