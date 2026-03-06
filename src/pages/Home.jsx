import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import meditation from "../assets/meditation.svg";
import journal from "../assets/journal.svg";
import mood from "../assets/mood.svg";
import breathing from "../assets/breathing.svg";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {

  const user = localStorage.getItem("mindwellUser");

  if (!user) {
    navigate("/login");
  }

}, []);
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      
      {/* HERO SECTION */}

      <h1 style={{ fontSize: "40px", color: "#2c3e50" }}>
        Welcome to MindWell
      </h1>

      <p style={{ fontSize: "18px", color: "#555", marginBottom: "40px" }}>
        Your personal mental wellness companion
      </p>

      {/* FEATURE CARDS */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >

        {/* JOURNAL CARD */}

        <Link to="/journal" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <img src={journal} width="80" />
            <h3>Guided Journal</h3>
            <p>Write daily reflections and thoughts</p>
          </div>
        </Link>

        {/* MOOD CARD */}

        <Link to="/mood" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <img src={mood} width="80" />
            <h3>Mood Tracker</h3>
            <p>Track your mood daily</p>
          </div>
        </Link>

        {/* ANALYTICS CARD */}

        <Link to="/analytics" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <img src={meditation} width="80" />
            <h3>Analytics</h3>
            <p>View mood trends over time</p>
          </div>
        </Link>

        {/* BREATHING CARD */}

        <Link to="/breathing" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>
            <img src={breathing} width="80" />
            <h3>Breathing</h3>
            <p>Relax with guided breathing</p>
          </div>
        </Link>

      </div>

    </div>
  );
}

const cardStyle = {
  background: "white",
  width: "220px",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

export default Home;