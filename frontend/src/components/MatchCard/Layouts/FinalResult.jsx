import { useEffect, useState } from 'react'
import { useMatch } from '../../../hooks/useMatch'
import styles from '../MatchCard.module.scss'

const FinalResult = (matchId, isAdmin) => {
  const [finalHomeScore, setFinalHomeScore] = useState(0)
  const [finalAwayScore, setFinalAwayScore] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [overTime, setOverTime] = useState(false)
  const { publishResult } = useMatch()

  const handlePublish = async (e) => {
    e.preventDefault()

    // eslint-disable-next-line react/destructuring-assignment
    await publishResult(matchId.matchId, finalHomeScore, finalAwayScore, overTime)

    setAccepted(true)
  }

  return (
    !accepted ? (
      <div className={styles.inputWrapper}>
        <h4>Add final result</h4>
        <div className={styles.inputTop}>
          <div className={styles.inputBox}>
            <span>TEAM 1</span>
            <input
              type="number"
              placeholder="0"
              value={finalHomeScore}
              onChange={(e) => setFinalHomeScore(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <span>TEAM 2</span>
            <input
              type="number"
              placeholder="0"
              value={finalAwayScore}
              onChange={(e) => setFinalAwayScore(e.target.value)}
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
          onClick={(e) => handlePublish(e)}
        >
          Publish
        </button>
      </div>
    ) : <h4>Accepted</h4>
  )
}

export default FinalResult
