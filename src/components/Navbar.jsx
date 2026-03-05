import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      background: "#5C8DF6",
      color: "white"
    }}>
      <h2>MindWell</h2>

      <div>
        <Link to="/" style={{margin:"15px", color:"white", textDecoration:"none"}}>Home</Link>
        <Link to="/journal" style={{margin:"15px", color:"white", textDecoration:"none"}}>Journal</Link>
        <Link to="/analytics" style={{margin:"15px", color:"white", textDecoration:"none"}}>Analytics</Link>
        <Link to="/breathing" style={{margin:"15px", color:"white", textDecoration:"none"}}>Breathing</Link>
      </div>
    </nav>
  );
}

export default Navbar;