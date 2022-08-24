import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMatch } from '../../../hooks/useMatch'
import styles from './AdminMatchCard.module.scss'

const FinalResult = ({ matchId, isAdmin }) => {
  const [finalHomeScore, setFinalHomeScore] = useState('')
  const [finalAwayScore, setFinalAwayScore] = useState('')
  const [overTime, setOverTime] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { publishResult } = useMatch()
  const { t } = useTranslation()

  const handlePublish = async (e) => {
    e.preventDefault()

    setSubmitted(true)

    await publishResult(matchId, finalHomeScore, finalAwayScore, overTime)
  }

  const onlyNumbers = (str) => /^[0-9]+$/.test(str)

  const scoreGapIsOne = (Math.max(finalHomeScore, finalAwayScore) - Math.min(finalHomeScore, finalAwayScore)) === 1

  const evenScore = (finalHomeScore === finalAwayScore)

  const validScore = (finalHomeScore.length > 1 && finalHomeScore[0] === 0)
  || (finalAwayScore.length > 1 && finalAwayScore[0] === 0)
  || !onlyNumbers(finalHomeScore) || !onlyNumbers(finalAwayScore)

  return (
    isAdmin && (
      <div className={styles.inputWrapper}>
        <h4>{t('matchCard.addResult')}</h4>
        <div className={styles.inputTop}>
          <div className={styles.inputBox}>
            <span>{t('matchCard.team1')}</span>
            <input
              type="number"
              placeholder="0"
              value={finalHomeScore}
              onChange={(e) => setFinalHomeScore(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <span>{t('matchCard.team2')}</span>
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
          disabled={evenScore || submitted || validScore}
        >
          {t('matchCard.publish')}
        </button>
      </div>
    )
  )
}

export default FinalResult
