import { useContext } from 'react'
import { MatchContext } from '../context/MatchContext'

export const useMatchContext = () => {
  const context = useContext(MatchContext)

  if (!context) {
    throw Error('useMatchContext must be used inside an MatchContextProvider')
  }

  return context
}
