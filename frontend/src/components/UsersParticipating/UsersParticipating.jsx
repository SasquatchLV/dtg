/* eslint-disable react/no-array-index-key */
import styles from './UsersParticipating.module.scss'

const UsersParticipating = ({ users }) => {
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
      {users.length ? (
        <ul>
          {users.map(({
            email, homeTeamScore, awayTeamScore, overTime, pointsEarned,
          }, i) => (
            <li key={i}>
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
                : <span>Outcome unknown</span>}
            </li>
          ))}
        </ul>
      ) : (
        <b className={styles.info}>
          <i>No bettors for this match</i>
        </b>
      )}
    </div>
  )
}

export default UsersParticipating
