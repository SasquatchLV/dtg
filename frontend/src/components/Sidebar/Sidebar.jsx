import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Sidebar.module.scss'
import { useTotoContext } from '../../hooks/useTotoContext'
import { useUser } from '../../hooks/useUser'
import { useAuthContext } from '../../hooks/useAuthContext'

const Sidebar = () => {
  const { t } = useTranslation()
  const { users, prizepool } = useTotoContext()
  const { user } = useAuthContext()
  const { getPrizePoolAndUsers } = useUser()

  const formatName = (name) => {
    if (!name) {
      return null
    }

    const names = name?.split(' ')
    const lastName = names[names.length - 1].toUpperCase()
    let formattedName = name

    if (names.length > 1) {
      formattedName = `${name[0][0].toUpperCase()}. ${lastName[0] + lastName.slice(1).toLowerCase()}`
    }

    return formattedName
  }

  useEffect(() => {
    if (user) {
      getPrizePoolAndUsers()
    }
  }, [user])

  return (
    <div className={styles.userContainer}>
      <div className={styles.prizePool}>
        <img src="https://cdn-icons-png.flaticon.com/512/3112/3112946.png" alt="trophy" className={styles.trophy} />
        <h4>{`${t('leaderBoard.prize')} ${prizepool}€`}</h4>
      </div>
      <h3 className={styles.title}>TOP 10</h3>
      {users.length ? (
        <table className={styles.userTable}>
          <thead>
            <tr className={styles.userTh}>
              <th>-</th>
              <th>{t('leaderBoard.user')}</th>
              <th>{t('leaderBoard.points')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({
              avatar, points, fullName, _id, lastFiveGames,
            }, index) => (index < 10 ? (
              <tr className={styles.userRow} key={_id}>
                <td><img src={avatar} className={styles.tableIcon} alt="avatar" /></td>
                <td>{formatName(fullName)}</td>
                <td>{points}</td>
              </tr>
            ) : null))}
          </tbody>
        </table>
      ) : (
        <div>
          <span className={styles.centered}>....</span>
          <span className={styles.centered}>....</span>
          <span className={styles.centered}>....</span>
        </div>
      )}
    </div>
  )
}

export default Sidebar
