import styles from './UsersParticipating.module.scss'

const UsersParticipating = ({ users }) => {
  const a = 6
  return (
    <div className={styles.container}>
      {users.length ? (
        <ul>
          {users.map(({
            email, homeTeamScore, awayTeamScore, overTime,
          }) => (
            <li>
              <span>{email}</span>
              <span>{`${homeTeamScore}:${awayTeamScore}${overTime ? 'OT' : ''}`}</span>
              <span>Outcome unknown</span>
            </li>
          ))}
        </ul>
      ) : (
        <h4>Nothing to show</h4>
      )}
    </div>
  )
}

export default UsersParticipating
