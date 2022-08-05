import React from 'react'
import styles from './ConfirmationModal.module.scss'

const ConfirmationModal = ({ text, handleConfirmation, handleCancelation }) => (
  <div className={styles.box}>
    <h5>{text}</h5>
    <div className={styles.buttons}>
      <button
        className={styles.cancel}
        onClick={() => handleCancelation()}
      >
        Cancel
      </button>
      <button
        className={styles.confirm}
        onClick={handleConfirmation}
      >
        Confirm
      </button>
    </div>
  </div>
)

export default ConfirmationModal
