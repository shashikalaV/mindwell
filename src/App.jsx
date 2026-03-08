import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Journal from "./pages/Journal";
import MoodTracker from "./pages/MoodTracker";
import Analytics from "./pages/Analytics";
import Breathing from "./pages/Breathing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function ProtectedRoute({ children }) {

  const user = JSON.parse(localStorage.getItem("mindwell_user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {

  return (
    <Router>

      <Navbar />

      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mood"
          element={
            <ProtectedRoute>
              <MoodTracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/breathing"
          element={
            <ProtectedRoute>
              <Breathing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;