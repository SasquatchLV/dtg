import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PredictCard.module.scss'
import { useMatch } from '../../../hooks/useMatch'

const PredictionInput = ({ matchId, locked }) => {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [overTime, setOverTime] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { makePrediction } = useMatch()
  const { t } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitted(true)

    await makePrediction(matchId, homeScore, awayScore, overTime)
  }

  const onlyNumbers = (str) => /^[0-9]+$/.test(str)

  const scoreGapIsOne = (Math.max(homeScore, awayScore) - Math.min(homeScore, awayScore)) === 1

  const evenScore = (homeScore === awayScore)

  const validScore = (homeScore.length > 1 && homeScore[0] === 0) || (awayScore.length > 1 && awayScore[0] === 0)
  || !onlyNumbers(homeScore) || !onlyNumbers(awayScore)

  return (
    !locked ? (
      <div className={styles.inputWrapper}>
        <h4 className={styles.title}>{t('matchCard.addResult')}</h4>
        <div className={styles.inputTop}>
          <div className={styles.inputBox}>
            <span>{t('matchCard.team1')}</span>
            <input
              type="number"
              placeholder="0"
              maxLength="2"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <span>{t('matchCard.team2')}</span>
            <input
              type="number"
              placeholder="0"
              max="2"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              required
            />
          </div>
          {scoreGapIsOne && (
          <div className={styles.inputBox}>
            <span>OT</span>
            <input type="checkbox" onChange={() => setOverTime(!overTime)} />
          </div>
          )}
        </div>
        <button
          className={styles.predictBtn}
          onClick={(e) => handleSubmit(e)}
          disabled={evenScore || submitted || validScore}
        >
          {t('matchCard.submit')}
        </button>
      </div>
    ) : (
      <h4 className={styles.lockedInfo}>
        {t('matchCard.locked')}
      </h4>
    )
  )
}

export default PredictionInput
