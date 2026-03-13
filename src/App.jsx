import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Journal from "./pages/Journal";
import MoodTracker from "./pages/MoodTracker";
import Analytics from "./pages/Analytics";
import Breathing from "./pages/Breathing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


/* PROTECTED ROUTE */

function ProtectedRoute({ children }) {

  const user = localStorage.getItem("mindwell_user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {

  const user = localStorage.getItem("mindwell_user");

  return (
    <HashRouter>

      <Navbar />

      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={
            user
            ? <Navigate to="/home" replace />
            : <Navigate to="/login" replace />
          }
        />

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

    </HashRouter>
  );
}

export default App;