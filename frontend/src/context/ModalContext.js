import { createContext, useReducer } from 'react'

export const ModalContext = createContext()

export const modalReducer = (state, action) => {
  const { payload: { text, confirm = () => {}, cancel = () => {} } = {} } = action

  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        active: true,
        text,
        confirm,
        cancel,
      }
    case 'CLOSE_MODAL':
      return {
        active: false,
        text,
      }
    default:
      return state
  }
}

export const ModalContextProvider = ({ children }) => {
  const [state, dispatchModal] = useReducer(modalReducer, {
    active: false,
    text: '',
    confirm: () => {},
    cancel: () => {},
  })

  return (
    <ModalContext.Provider value={{ ...state, dispatchModal }}>
      { children }
    </ModalContext.Provider>
  )
}
