import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Login from './pages/Login/Login'
import Header from './components/Header/Header'
import AdminPanel from './pages/Admin/AdminPanel'
import Matches from './pages/Matches/Matches'
import Standings from './pages/Standings/Standings'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'
import ProtectedRoute from './components/ProtectedRoute/protectedRoute'

function App() {
  const { user } = useAuthContext()
  const isAdmin = user?.roles?.includes(2000)

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={(
              <ProtectedRoute>
                <Routes>
                  <Route path="/matches" element={<Matches />} />
                </Routes>
              </ProtectedRoute>
          )}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
