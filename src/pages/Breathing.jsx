import { useState } from "react";

function Breathing(){

  const [active,setActive] = useState(false);

  const startBreathing = ()=>{
    setActive(true);
  }

  return(

    <div style={{textAlign:"center",padding:"40px"}}>

      <h2>Breathing Exercise</h2>

      <p>Follow the circle and breathe slowly</p>

      <div
        style={{
          width:"150px",
          height:"150px",
          margin:"40px auto",
          borderRadius:"50%",
          background:"#5C8DF6",
          animation: active ? "breath 6s infinite" : "none"
        }}
      />

      <button
        onClick={startBreathing}
        style={{
          padding:"10px 20px",
          border:"none",
          background:"#5C8DF6",
          color:"white",
          borderRadius:"6px",
          cursor:"pointer"
        }}
      >
        Start Breathing
      </button>

    </div>
  )
}

export default Breathing;