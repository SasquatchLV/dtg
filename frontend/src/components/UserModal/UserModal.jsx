/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './UserModal.module.scss'
import { avatars } from '../../data/avatars'
import { useUser } from '../../hooks/useUser'
import { useTotoContext } from '../../hooks/useTotoContext'

const UserModal = ({ handleToggle }) => {
  const [avatarSelectionActive, setAvatarSelectionActive] = useState(false)
  const [passwordInputActive, setPasswordInputActive] = useState(false)
  const [newPassValue, setNewPassValue] = useState('')
  const { activeUser } = useTotoContext()
  const { user } = useAuthContext()
  const { updateAvatar, changeUserPassword, getUser } = useUser()
  const { t } = useTranslation()

  const userFound = Object.keys(activeUser).length

  const determineStyle = (game) => {
    const style = {
      backgroundColor: '#e0d315',
    }

    if (game === '0p') {
      style.backgroundColor = '#E44D2E'
    } else if (game === '1p') {
      style.backgroundColor = '#9af3b4'
    } else if (game === '2p') {
      style.backgroundColor = '#03C03C'
    }

    return style
  }

  useEffect(() => {
    getUser(user.email)
  }, [])

  const handleSelection = async (avatarLink) => {
    await updateAvatar(avatarLink)
    await getUser(user.email)
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

  return userFound ? (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <button
          className={styles.close}
          onClick={handleToggle}
        >
          X
        </button>
        <img
          className={styles.userAvatar}
          src={activeUser.avatar}
          alt="avatar"
        />
        <button onClick={() => setAvatarSelectionActive(true)}>
          {t('userModal.changeAvatar')}
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
            {t('userModal.changePassword')}
          </button>
        ) : (
          <ClickAwayListener onClickAway={handleClickAway}>
            <form
              className={styles.passwordBox}
              onSubmit={(e) => confirmPassword(e)}
            >
              <label>{t('userModal.newPassword')}</label>
              <input
                type="password"
                onChange={(e) => setNewPassValue(e.target.value)}
                placeholder={t('placeholder.password')}
                required
                minLength="8"
              />
              <button type="submit" className={styles.confirm}>
                {t('userModal.confirm')}
              </button>
            </form>
          </ClickAwayListener>
        )}
      </div>
      <div className={styles.rightSide}>
        <div className={styles.box}>
          <span className={styles.title}>{t('userModal.points')}</span>
          <span className={styles.points}>{`${activeUser.points}p`}</span>
        </div>
        <div className={styles.box}>
          <span className={styles.title}>{t('userModal.lastGames')}</span>
          <div className={styles.gameWrapper}>
            {activeUser.lastFiveGames.map((game, i) => (
              <span
                className={styles.won}
                style={determineStyle(game)}
                key={i}
              >
                {game}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h4>Loading..</h4>
  )
}

export default UserModal
