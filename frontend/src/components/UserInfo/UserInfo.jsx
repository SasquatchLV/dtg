import React from 'react'
import styles from '../../pages/Admin/AdminPanel.module.scss'
import { useUser } from '../../hooks/useUser'

const UserInfo = (props) => {
  const { activeUser } = props
  const {
    promoteUser, demoteUser, toggleHasPaid, deleteUser,
  } = useUser()

  const icons = [
    {
      title: 'Promote',
      imgLink: 'https://cdn-icons-png.flaticon.com/32/3050/3050304.png',
      handleClick: () => {
        promoteUser(activeUser.email)
      },
    },
    {
      title: 'Demote',
      imgLink: 'https://cdn-icons-png.flaticon.com/32/727/727358.png',
      handleClick: () => {
        demoteUser(activeUser.email)
      },
    },
    {
      title: 'Payment',
      imgLink: 'https://cdn-icons-png.flaticon.com/512/126/126179.png',
      handleClick: () => {
        toggleHasPaid(activeUser.email)
      },
    },
    {
      title: 'Delete',
      imgLink: 'https://cdn-icons-png.flaticon.com/32/3221/3221845.png',
      handleClick: () => {
        deleteUser(activeUser.email)
      },
    },
  ]

  return (
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
              {Object.keys(activeUser.roles)[
                Object.keys(activeUser.roles).length - 1
              ]}
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
  )
}

export default UserInfo
