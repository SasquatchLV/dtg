import styles from './PredictCard.module.scss'
import PredictionInput from './PredictionInput'

const PredictResult = ({ matchId, isAdmin, locked }) => (
  !isAdmin
    ? <PredictionInput matchId={matchId} locked={locked} />
    : <h4 className={styles.info}>Admins can`t participate</h4>
)

export default PredictResult
