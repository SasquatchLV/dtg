import React from 'react'
import styles from './ConfirmationModal.module.scss'
import { useModalContext } from '../../hooks/useModalContext'

const Portal = () => {
  const {
    active, text, confirm, cancel,
  } = useModalContext()

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
            Cancel
          </button>
          <button
            className={styles.confirm}
            onClick={confirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    )
  )
}

export default Portal
