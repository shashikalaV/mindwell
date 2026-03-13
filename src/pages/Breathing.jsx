import { useState, useEffect } from "react";

function Breathing(){
  const [userName,setUserName] = useState("");
  const [active,setActive] = useState(false);
  const [phase,setPhase] = useState("Ready");

  const startExercise = ()=>{

  setActive(true);

  const sessions = JSON.parse(localStorage.getItem("breathingSessions")) || [];

  sessions.push({
    date: new Date().toISOString()
  });

  localStorage.setItem("breathingSessions", JSON.stringify(sessions));

}

  const stopBreathing = ()=>{
    setActive(false);
    setPhase("Ready");
  }
   useEffect(()=>{

  const user = JSON.parse(localStorage.getItem("mindwell_user"));
  if(user){
    setUserName(user.username);
  }

},[]);
  useEffect(()=>{

    if(!active) return;

    const phases = ["Inhale","Hold","Exhale"];
    let index = 0;

    setPhase(phases[0]);

    const interval = setInterval(()=>{
      index = (index + 1) % phases.length;
      setPhase(phases[index]);
    },2000);

    return ()=>clearInterval(interval);

  },[active]);

  return(

    <div
      style={{
        textAlign:"center",
        padding:"60px",
        minHeight:"70vh",
        background:"#f4f6fb"
      }}
    >

      <h2 style={{fontSize:"28px",marginBottom:"10px"}}>
        Breathing Exercise
      </h2>

      <p style={{color:"#555"}}>
  Hello {userName}, shall we start today's exercise?
</p>

      <div
        style={{
          width:"220px",
          height:"220px",
          margin:"50px auto",
          borderRadius:"50%",
          background:"linear-gradient(135deg,#6C8CF5,#5C8DF6)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          color:"white",
          fontSize:"22px",
          fontWeight:"bold",
          boxShadow:"0 10px 30px rgba(0,0,0,0.15)",
          animation: active ? "breath 6s ease-in-out infinite" : "none"
        }}
      >

        {active ? phase : "Ready"}

      </div>

      <button
        onClick={active ? stopBreathing : startExercise}
        style={{
          padding:"12px 26px",
          border:"none",
          background: active ? "#ff5c5c" : "#5C8DF6",
          color:"white",
          borderRadius:"8px",
          cursor:"pointer",
          fontWeight:"bold",
          fontSize:"15px",
          boxShadow:"0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        {active ? "Stop Exercise" : "Start Exercise"}
      </button>

      <style>
        {`
        @keyframes breath {
          0%{
            transform:scale(1);
          }
          50%{
            transform:scale(1.4);
          }
          100%{
            transform:scale(1);
          }
        }
        `}
      </style>

    </div>
  )
}

export default Breathing;