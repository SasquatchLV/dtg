import { createContext, useReducer } from 'react'

export const MatchContext = createContext()

export const matchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MATCHES':
      return {
        ...state,
        matches: action.payload,
      }
    case 'CREATE_MATCH':
      return {
        ...state,
        matches: [...state.matches, action.payload],
      }
    case 'DELETE_MATCH':
      return {
        ...state,
        matches: state.matches.filter((w) => w._id !== action.payload._id),
      }
    case 'SET_UNSETTLED_MATCHES':
      return {
        ...state,
        unsettledMatches: action.payload,
      }
    default:
      return state
  }
}

export const MatchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(matchReducer, {
    matches: [],
    unsettledMatches: [],
  })

  return (
    <MatchContext.Provider value={{ ...state, dispatch }}>
      { children }
    </MatchContext.Provider>
  )
}
