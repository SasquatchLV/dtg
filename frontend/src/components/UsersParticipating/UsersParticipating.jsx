/* eslint-disable react/no-array-index-key */
import { useTranslation } from 'react-i18next'
import styles from './UsersParticipating.module.scss'

const UsersParticipating = ({ users }) => {
  const { t } = useTranslation()
  const sorted = users.sort((a, b) => b.pointsEarned?.localeCompare(a.pointsEarned))

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

  return (
    <div className={styles.container}>
      {sorted.length ? (
        <ul>
          {sorted.map(({
            email, homeTeamScore, awayTeamScore, overTime, pointsEarned,
          }, i) => (
            <li key={i} className={styles.row}>
              <span>{email}</span>
              <span>{`${homeTeamScore} - ${awayTeamScore}${overTime ? 'OT' : ''}`}</span>
              {pointsEarned
                ? (
                  <span
                    className={styles.won}
                    style={determineStyle(pointsEarned)}
                  >
                    {pointsEarned}
                  </span>
                )
                : <span>{t('matchCard.outcomeUnknown')}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <b className={styles.info}>
          <i>{t('matchCard.noBettors')}</i>
        </b>
      )}
    </div>
  )
}

export default UsersParticipating
