import React, { useRef, useEffect } from 'react'
import styles from './ConfirmationModal.module.scss'

const ConfirmationModal = ({ text, handleConfirmation, handleCancelation }) => {
  const boxRef = useRef(null)

  // const handleClickOutside = (event) => {
  //   if (boxRef.current && !boxRef.current.contains(event.target)) {
  //     dispatch(updateMessage(''))
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, false)

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, false)
  //   }
  // }, [])

  return (
    <div className={styles.blur}>
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
    </div>
  )
}

export default ConfirmationModal
