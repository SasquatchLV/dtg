import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Login from './pages/Login/Login'
import Header from './components/Header/Header'
import Matches from './pages/Matches/Matches'
import Standings from './pages/Standings/Standings'
import AdminPanel from './pages/Admin/AdminPanel'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'
import ProtectedRoute from './components/ProtectedRoute/protectedRoute'
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal'

function App() {
  const { user } = useAuthContext()
  const isAdmin = user?.roles?.includes(2000)

  return (
    <BrowserRouter basename="/">
      <ConfirmationModal />
      {user && <Header />}
      <div className="pages">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/matches" />} />
          <Route
            path="*"
            element={(
              <ProtectedRoute>
                <Routes>
                  <Route path="/matches" element={<Matches />} />
                  {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
                  <Route path="/standings" element={<Standings />} />
                  <Route path="/leaderboard" element={<LeaderBoard />} />
                  <Route path="/*" element={<Navigate to="matches" replace />} />
                </Routes>
              </ProtectedRoute>
          )}
          />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
