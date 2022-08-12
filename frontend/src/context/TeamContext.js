import { createContext, useReducer } from 'react'

export const TeamContext = createContext()

export const teamReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return {
        ...state,
        teams: action.payload,
      }
    default:
      return state
  }
}

export const TeamContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teamReducer, {
    teams: [],
  })

  return (
    <TeamContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TeamContext.Provider>
  )
}
