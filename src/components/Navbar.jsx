import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#2F3E63",
        color: "white"
      }}
    >

      <h2>MindWell</h2>

      <div style={{ display: "flex", gap: "20px" }}>

        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/mood">Track Mood</Link>
        <Link style={linkStyle} to="/journal">Journal</Link>
        <Link style={linkStyle} to="/analytics">Analytics</Link>
        <Link style={linkStyle} to="/breathing">Breathing</Link>
        <Link style={linkStyle} to="/profile">Profile</Link>

      </div>

    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Navbar;