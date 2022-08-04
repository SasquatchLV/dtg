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

function App() {
  const { user } = useAuthContext()
  const isAdmin = user?.roles?.includes(2000)

  return (
    <div className="app">
      <BrowserRouter>
        {user && <Header />}
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/matches" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/matches" />}
            />
            <Route
              path="/admin"
              element={isAdmin ? <AdminPanel /> : <Navigate to="/matches" />}
            />
            <Route path="/matches" element={<Matches />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
