import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import AdminPanel from "./pages/Admin/AdminPanel";
import Matches from "./pages/Matches/Matches";
import Teams from "./pages/Teams/Teams";

function App() {
  const { user } = useAuthContext();
  const isAdmin = user?.roles?.includes(2000);

  return (
    <div className="App">
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
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
