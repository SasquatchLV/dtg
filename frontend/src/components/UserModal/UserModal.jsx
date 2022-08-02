/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './UserModal.module.scss'

const UserModal = () => {
  const { user } = useAuthContext()

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img
          className={styles.userAvatar}
          src={user.avatar}
          alt="avatar"
        />
        <button>
          Change Avatar
        </button>
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
