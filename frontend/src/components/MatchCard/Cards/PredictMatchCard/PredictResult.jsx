import { useState } from 'react'
import { errorToast, successToast } from '../../../../utils/toast'
import styles from './PredictCard.module.scss'

const PredictResult = ({ matchId, isAdmin }) => {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [overTime, setOverTime] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const prediction = {
      matchId,
      homeScore,
      awayScore,
      overTime,
    }

    const makePrediction = async () => {
      const response = await fetch('/api/match/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prediction),
      })

      const { status, message } = await response.json()

      if (status === 'success') {
        successToast(message)
      } else {
        errorToast(message)
      }
    }

    await makePrediction()
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