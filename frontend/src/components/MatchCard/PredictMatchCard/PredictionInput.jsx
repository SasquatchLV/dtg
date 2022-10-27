import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PredictCard.module.scss'
import { useMatch } from '../../../hooks/useMatch'

const PredictionInput = ({
  matchId, locked, usersBet, setIsEditing,
}) => {
  const [homeScore, setHomeScore] = useState(usersBet?.homeTeamScore || 0)
  const [awayScore, setAwayScore] = useState(usersBet?.awayTeamScore || 0)
  const [submitted, setSubmitted] = useState(false)
  const { makePrediction, getMatches } = useMatch()
  const { t } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitted(true)

    await makePrediction(matchId, homeScore, awayScore)

    setSubmitted(false)
    setIsEditing(false)
  }

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
              value={Number(homeScore).toFixed(0)}
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
              value={Number(awayScore).toFixed(0)}
              onChange={(e) => setAwayScore(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className={styles.predictBtn}
          onClick={(e) => handleSubmit(e)}
          disabled={submitted}
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
