import styles from './LeaderBoardCard.module.scss'

const LeaderBoardCard = ({ avatar, email, points }) => (
  <div className={styles.userRow}>
    <img src={avatar} alt="avatar" />
    <h4>{email}</h4>
    <h4>{points}</h4>
  </div>
)

export default LeaderBoardCard
