import { useTranslation } from 'react-i18next'
import styles from './PredictCard.module.scss'
import PredictionInput from './PredictionInput'

const PredictResult = ({ matchId, isAdmin, locked }) => {
  const { t } = useTranslation()

  return (
    !isAdmin
      ? <PredictionInput matchId={matchId} locked={locked} />
      : <h4 className={styles.info}>{t('matchCard.noAdmin')}</h4>
  )
}

export default PredictResult
