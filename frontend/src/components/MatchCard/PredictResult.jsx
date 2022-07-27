import { useState } from 'react'

import { useMatch } from '../../hooks/useMatch'
import styles from './MatchCard.module.scss'

const PredictResult = (matchId) => {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [participated, setParticipated] = useState(false)
  const [overTime, setOverTime] = useState(false)
  const { makePrediction } = useMatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // eslint-disable-next-line react/destructuring-assignment
    await makePrediction(matchId.matchId, homeScore, awayScore, overTime)
    setParticipated(true)
  }

  return (
    !participated ? (
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
        <button
          className={styles.predictBtn}
          onClick={(e) => handleSubmit(e)}
        >
          SUBMIT
        </button>
      </div>
    ) : (
      <h4>Accepted</h4>
    )
  )
}

export default PredictResult
