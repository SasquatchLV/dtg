import { createContext, useReducer } from 'react'

export const TotoContext = createContext()

export const totoReducer = (state, action) => {
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
        matches: state.matches.filter(({ _id }) => _id !== action.payload._id),
      }
    case 'SET_UNSETTLED_MATCHES':
      return {
        ...state,
        unsettledMatches: action.payload,
      }
    case 'SET_TEAMS':
      return {
        ...state,
        teams: action.payload,
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }
    case 'SET_USER':
      return {
        ...state,
        activeUser: action.payload,
      }
    case 'SET_PRIZEPOOL':
      return {
        ...state,
        prizepool: action.payload,
      }
    case 'SET_SEASONS':
      return {
        ...state,
        seasons: action.payload,
      }
    case 'SET_ACTIVESEASON':
      return {
        ...state,
        activeSeason: action.payload,
      }
    case 'SET_YEARS':
      return {
        ...state,
        years: action.payload,
      }
    case 'SET_ONGOING':
      return {
        ...state,
        ongoingSeason: action.payload,
      }
    case 'SET_TEAMSELECTION':
      return {
        ...state,
        teamSelection: action.payload,
      }
    default:
      return state
  }
}

export const TotoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(totoReducer, {
    matches: [],
    unsettledMatches: [],
    teams: [],
    users: [],
    activeUser: {},
    prizepool: 0,
    seasons: [],
    activeSeason: {},
    years: [],
    ongoingSeason: false,
    teamSelection: [],
    refreshMatches: () => { },
  })

  return (
    <TotoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TotoContext.Provider>
  )
}
