import { useTranslation } from 'react-i18next'
import styles from './PredictCard.module.scss'
import PredictionInput from './PredictionInput'

const PredictResult = ({
  matchId, isAdmin, locked, usersBet, setIsEditing,
}) => {
  const { t } = useTranslation()

  return (
    !isAdmin
      ? <PredictionInput matchId={matchId} locked={locked} usersBet={usersBet} setIsEditing={setIsEditing} />
      : <h4 className={styles.info}>{t('matchCard.noAdmin')}</h4>
  )
}

export default PredictResult
