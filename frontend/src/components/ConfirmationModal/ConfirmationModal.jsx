import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './ConfirmationModal.module.scss'
import Portal from './Portal'

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

  return ReactDOM.createPortal(
    <Portal text={text} handleConfirmation={handleConfirmation} handleCancelation={handleCancelation} />,
    document.getElementById('portal'),
  )
}

export default ConfirmationModal
