import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { MatchContextProvider } from './context/MatchContext'
import { ModalContextProvider } from './context/ModalContext'
import { UserContextProvider } from './context/UserContext'
import { TeamContextProvider } from './context/TeamContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModalContextProvider>
        <TeamContextProvider>
          <UserContextProvider>
            <MatchContextProvider>
              <App />
            </MatchContextProvider>
          </UserContextProvider>
        </TeamContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
