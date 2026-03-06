import { useState, useEffect } from "react";

function MoodTracker() {

  const [todayMood, setTodayMood] = useState("");

  const moods = ["Happy", "Neutral", "Sad", "Angry"];

  useEffect(() => {
    const storedMoods = JSON.parse(localStorage.getItem("moods")) || [];

    const today = new Date().toLocaleDateString();

    const todayEntry = storedMoods.find(entry => entry.date === today);

    if (todayEntry) {
      setTodayMood(todayEntry.mood);
    }

  }, []);

  const selectMood = (mood) => {

    const storedMoods = JSON.parse(localStorage.getItem("moods")) || [];

    const today = new Date().toLocaleDateString();

    const existingIndex = storedMoods.findIndex(entry => entry.date === today);

    if (existingIndex !== -1) {
      storedMoods[existingIndex].mood = mood;
    } else {
      storedMoods.push({
        date: today,
        mood: mood
      });
    }

    localStorage.setItem("moods", JSON.stringify(storedMoods));

    setTodayMood(mood);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>

      <h2>How are you feeling today?</h2>

      <div style={{ fontSize: "40px", marginTop: "20px" }}>

        <span onClick={() => selectMood("Happy")} style={{ cursor: "pointer", margin: "10px" }}>😊</span>
        <span onClick={() => selectMood("Neutral")} style={{ cursor: "pointer", margin: "10px" }}>😐</span>
        <span onClick={() => selectMood("Sad")} style={{ cursor: "pointer", margin: "10px" }}>😢</span>
        <span onClick={() => selectMood("Angry")} style={{ cursor: "pointer", margin: "10px" }}>😡</span>

      </div>

      {todayMood && (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          You are feeling <b>{todayMood}</b> today
        </p>
      )}

    </div>
  );
}

export default MoodTracker;