/* eslint-disable react/no-array-index-key */
import styles from './LeaderBoardCard.module.scss'

const LeaderBoardCard = ({
  avatar, email, points, lastFiveGames,
}) => {
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
    <div className={styles.userRow}>
      <img src={avatar} alt="avatar" />
      <h4 className={styles.email}>{email}</h4>
      <div className={styles.games}>
        {lastFiveGames.length ? lastFiveGames.map((game, i) => (
          <span
            className={styles.won}
            style={determineStyle(game)}
            key={i}
          >
            {game}
          </span>
        )) : <span>No games played</span>}
      </div>
      <h4 className={styles.points}>
        {points}
      </h4>
    </div>
  )
}

export default LeaderBoardCard
