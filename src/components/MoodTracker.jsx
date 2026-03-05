import { useState } from "react";

function MoodTracker() {
  const [mood, setMood] = useState("");

  const selectMood = (selectedMood) => {
    setMood(selectedMood);
  };

  return (
    <div style={{marginTop:"30px"}}>
      <h2>How are you feeling today?</h2>

      <div style={{fontSize:"40px", marginTop:"20px"}}>
        <span style={{margin:"10px", cursor:"pointer"}} onClick={() => selectMood("Happy")}>😊</span>
        <span style={{margin:"10px", cursor:"pointer"}} onClick={() => selectMood("Neutral")}>😐</span>
        <span style={{margin:"10px", cursor:"pointer"}} onClick={() => selectMood("Sad")}>😢</span>
      </div>

      {mood && (
        <p style={{marginTop:"20px"}}>
          Your mood today: <b>{mood}</b>
        </p>
      )}
    </div>
  );
}

export default MoodTracker;