import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import styles from './UserInfo.module.scss'
import { useUser } from '../../hooks/useUser'
import { useModalContext } from '../../hooks/useModalContext'
import { useTotoContext } from '../../hooks/useTotoContext'

const UserInfo = () => {
  const { foundUser, users } = useTotoContext()
  const {
    email, avatar, points, roles, hasPaid, createdAt, fullName,
  } = foundUser
  const {
    promoteUser, demoteUser, toggleHasPaid, deleteUser, getUsers, findUser,
  } = useUser()
  const { dispatchModal } = useModalContext()
  const { t } = useTranslation()

  const deleteModalProps = {
    text: 'Confirm to delete!',
    confirm: async () => {
      await deleteUser(email)
      dispatchModal({ type: 'CLOSE_MODAL' })
    },
    cancel: () => dispatchModal({ type: 'CLOSE_MODAL' }),
  }

  useEffect(() => {
    getUsers()
  }, [])

  const icons = [
    {
      title: t('user.promote'),
      imgLink: 'https://cdn-icons-png.flaticon.com/32/3050/3050304.png',
      handleClick: () => promoteUser(email),
    },
    {
      title: t('user.demote'),
      imgLink: 'https://cdn-icons-png.flaticon.com/32/727/727358.png',
      handleClick: () => demoteUser(email),
    },
    {
      title: t('user.payment'),
      imgLink: 'https://cdn-icons-png.flaticon.com/512/126/126179.png',
      handleClick: () => toggleHasPaid(email),
    },
    {
      title: t('user.delete'),
      imgLink: 'https://cdn-icons-png.flaticon.com/32/3221/3221845.png',
      handleClick: () => dispatchModal({ type: 'OPEN_MODAL', payload: deleteModalProps }),
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {users.map((user) => (
          <div className={styles.userSmallBox} key={user._id} onClick={() => findUser(user.email)}>
            <img src={user.avatar} alt="avatar" />
            <span>{user.fullName}</span>
          </div>
        ))}
      </div>

      {Object.keys(foundUser).length ? (
        <div className={styles.userProfile}>
          <div className={styles.userLeft}>
            <img
              className={styles.userAvatar}
              src={avatar}
              alt="avatar"
            />
            <div className={styles.leftBottom}>
              <span>{`${t('user.points')} ${points}`}</span>
            </div>
          </div>
          <div className={styles.userRight}>
            <div className={styles.userEmail}>
              <h3>{email}</h3>
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
                <span>{t('user.role')}</span>
                <span>
                  {Object.keys(roles)[
                    Object.keys(roles).length - 1
                  ]}
                </span>
              </li>
              <li>
                <span>{t('user.registered')}</span>
                <span>{createdAt.slice(0, 10)}</span>
              </li>
              <li>
                <span>{t('user.hasPaid')}</span>
                <span>{hasPaid ? t('yes') : t('no')}</span>
              </li>
              <li>
                <span>{t('user.fullName')}</span>
                <span>{fullName}</span>
              </li>
            </ul>
            <img
              className={styles.paidStatus}
              src={hasPaid ? '/paid.png' : '/notpaid.png'}
              alt="hasPaid"
            />
          </div>
        </div>
      ) : <h3>{t('user.noUser')}</h3>}
    </div>
  )
}

export default UserInfo
