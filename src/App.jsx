import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Journal from "./pages/Journal";
import MoodTracker from "./pages/MoodTracker";
import Analytics from "./pages/Analytics";
import Breathing from "./pages/Breathing";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/breathing" element={<Breathing />} />
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;