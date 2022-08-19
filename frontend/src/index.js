import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { ModalContextProvider } from './context/ModalContext'
import { TotoContextProvider } from './context/TotoContext'

import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContextProvider>
        <ModalContextProvider>
          <TotoContextProvider>
            <App />
          </TotoContextProvider>
        </ModalContextProvider>
      </AuthContextProvider>
    </Suspense>
  </React.StrictMode>,
)
