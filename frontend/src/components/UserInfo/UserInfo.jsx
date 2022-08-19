import { useTranslation } from 'react-i18next'
import styles from './UserInfo.module.scss'
import { useUser } from '../../hooks/useUser'
import { useModalContext } from '../../hooks/useModalContext'
import { useTotoContext } from '../../hooks/useTotoContext'

const UserInfo = () => {
  const { activeUser } = useTotoContext()
  const {
    promoteUser, demoteUser, toggleHasPaid, deleteUser,
  } = useUser()
  const { dispatchModal } = useModalContext()
  const { t } = useTranslation()

  const deleteModalProps = {
    text: 'Confirm to delete!',
    confirm: async () => {
      await deleteUser(activeUser.email)
      dispatchModal({ type: 'CLOSE_MODAL' })
    },
    cancel: () => dispatchModal({ type: 'CLOSE_MODAL' }),
  }

  const icons = [
    {
      title: t('user.promote'),
      imgLink: 'https://cdn-icons-png.flaticon.com/32/3050/3050304.png',
      handleClick: () => promoteUser(activeUser.email),
    },
    {
      title: t('user.demote'),
      imgLink: 'https://cdn-icons-png.flaticon.com/32/727/727358.png',
      handleClick: () => demoteUser(activeUser.email),
    },
    {
      title: t('user.payment'),
      imgLink: 'https://cdn-icons-png.flaticon.com/512/126/126179.png',
      handleClick: () => toggleHasPaid(activeUser.email),
    },
    {
      title: t('user.delete'),
      imgLink: 'https://cdn-icons-png.flaticon.com/32/3221/3221845.png',
      handleClick: () => dispatchModal({ type: 'OPEN_MODAL', payload: deleteModalProps }),
    },
  ]

  return (
    Object.keys(activeUser).length ? (
      <div className={styles.userProfile}>
        <div className={styles.userLeft}>
          <img
            className={styles.userAvatar}
            src={activeUser.avatar}
            alt="avatar"
          />
          <div className={styles.leftBottom}>
            <span>{`${t('user.points')} ${activeUser.points}`}</span>
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
              <span>{t('user.role')}</span>
              <span>
                {Object.keys(activeUser.roles)[
                  Object.keys(activeUser.roles).length - 1
                ]}
              </span>
            </li>
            <li>
              <span>{t('user.registered')}</span>
              <span>{activeUser.createdAt.slice(0, 10)}</span>
            </li>
            <li>
              <span>{t('user.hasPaid')}</span>
              <span>{activeUser.hasPaid ? t('yes') : t('no')}</span>
            </li>
          </ul>
          <img
            className={styles.paidStatus}
            src={activeUser.hasPaid ? '/paid.png' : '/notpaid.png'}
            alt="hasPaid"
          />
        </div>
      </div>
    ) : <h3>{t('user.noUser')}</h3>
  )
}

export default UserInfo
