import { useTranslation } from 'react-i18next'
import styles from './ConfirmationModal.module.scss'
import { useModalContext } from '../../hooks/useModalContext'

const Portal = () => {
  const {
    active, text, confirm, cancel,
  } = useModalContext()
  const { t } = useTranslation()

  return (
    active
    && (
    <div className={styles.blur}>
      <div className={styles.box}>
        <h5>{text}</h5>
        <div className={styles.buttons}>
          <button
            className={styles.cancel}
            onClick={cancel}
          >
            {t('confirmModal.cancel')}
          </button>
          <button
            className={styles.confirm}
            onClick={confirm}
          >
            {t('confirmModal.confirm')}
          </button>
        </div>
      </div>
    </div>
    )
  )
}

export default Portal
