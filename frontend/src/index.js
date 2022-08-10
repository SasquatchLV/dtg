import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { MatchContextProvider } from './context/MatchContext'
import { ModalContextProvider } from './context/ModalContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModalContextProvider>
        <MatchContextProvider>
          <App />
        </MatchContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
