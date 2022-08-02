/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './UserModal.module.scss'
import { avatars } from '../../data/avatars'
import { usePromote } from '../../hooks/usePromote'

const UserModal = () => {
  const [avatarSelectionActive, setAvatarSelectionActive] = useState(false)
  const { user } = useAuthContext()
  const { updateAvatar } = usePromote()

  const handleSelection = async (avatarLink) => {
    await updateAvatar(avatarLink)
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img
          className={styles.userAvatar}
          src={user.avatar}
          alt="avatar"
        />
        <button onClick={() => setAvatarSelectionActive(!avatarSelectionActive)}>
          Change Avatar
        </button>
        {avatarSelectionActive && (
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
        )}
        <button>
          Change Password
        </button>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.box}>
          <span className={styles.title}>
            Collected points
          </span>
          <span className={styles.points}>
            {`${user.points}p`}
          </span>
        </div>
        <div className={styles.box}>
          <span className={styles.title}>
            Last five games
          </span>
          <div className={styles.gameWrapper}>
            {user.lastFiveGames.map((game, i) => (
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
  )
}

export default UserModal
