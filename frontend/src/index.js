import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { MatchContextProvider } from './context/MatchContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MatchContextProvider>
        <App />
      </MatchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
