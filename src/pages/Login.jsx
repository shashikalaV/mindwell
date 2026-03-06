import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

  const [name,setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    if(name.trim()==="") return;

    localStorage.setItem("mindwellUser", name);

    navigate("/");

  };

  return(

    <div style={{textAlign:"center",padding:"60px"}}>

      <h2>Welcome to MindWell</h2>

      <p>Your safe space for reflection</p>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        style={{
          padding:"10px",
          marginTop:"20px",
          borderRadius:"8px",
          border:"1px solid #ccc"
        }}
      />

      <br/>

      <button
        onClick={handleLogin}
        style={{
          marginTop:"20px",
          padding:"10px 20px",
          border:"none",
          background:"#6C63FF",
          color:"white",
          borderRadius:"8px",
          cursor:"pointer"
        }}
      >
        Enter MindWell
      </button>

    </div>

  );

}

export default Login;