import { useContext } from 'react'
import { TotoContext } from '../context/TotoContext'

export const useTotoContext = () => {
  const context = useContext(TotoContext)

  if (!context) {
    throw Error('useTotoContext must be used inside an TotoContextProvider')
  }

  return context
}
