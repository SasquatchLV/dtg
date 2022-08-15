import { useState } from 'react'
import { errorToast, successToast } from '../../../../utils/toast'
import styles from './PredictCard.module.scss'
import { useMatch } from '../../../../hooks/useMatch'

const PredictResult = ({ matchId, isAdmin }) => {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [overTime, setOverTime] = useState(false)
  const { makePrediction } = useMatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await makePrediction(matchId, homeScore, awayScore, overTime)
  }

  return (
    !isAdmin ? (
      <div className={styles.inputWrapper}>
        <div className={styles.inputTop}>
          <div className={styles.inputBox}>
            <span>TEAM 1</span>
            <input
              type="number"
              placeholder="0"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <span>TEAM 2</span>
            <input
              type="number"
              placeholder="0"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <span>OT</span>
            <input type="checkbox" onChange={() => setOverTime(!overTime)} />
          </div>
        </div>
        <button className={styles.predictBtn} onClick={(e) => handleSubmit(e)}>
          SUBMIT
        </button>
      </div>
    ) : <h4 className={styles.info}>Admins can`t participate</h4>
  )
}

export default PredictResult
