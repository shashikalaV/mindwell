import { useState, useEffect } from "react";

function MoodTracker() {

  const [todayMood, setTodayMood] = useState("");
  const [streak, setStreak] = useState(0);
  const [moodHistory, setMoodHistory] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      setUserName(user.username);
    }

    const storedMoods = JSON.parse(localStorage.getItem("moods")) || [];
    setMoodHistory(storedMoods);

    const today = new Date().toISOString().split("T")[0];

    const todayEntry = storedMoods.find(entry => entry.date === today);

    if (todayEntry) {
      setTodayMood(todayEntry.mood);
    }

    let currentStreak = 0;

    const sortedMoods = [...storedMoods].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    for (let i = 0; i < sortedMoods.length; i++) {

      const checkDateObj = new Date();
      checkDateObj.setDate(checkDateObj.getDate() - i);

      const checkDate = checkDateObj.toISOString().split("T")[0];

      if (sortedMoods[i] && sortedMoods[i].date === checkDate) {
        currentStreak++;
      } else {
        break;
      }

    }

    setStreak(currentStreak);

  }, []);

  const selectMood = (mood) => {

    const storedMoods = JSON.parse(localStorage.getItem("moods")) || [];

    const today = new Date().toISOString().split("T")[0];

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
    setMoodHistory(storedMoods);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px",
        minHeight: "80vh",
        background: "#f4f6fb"
      }}
    >

      <h1 style={{ marginBottom: "10px", color: "#333" }}>
        Mood Tracker
      </h1>

      <h2 style={{ color: "#555" }}>
        Hello {userName}, how are you feeling today?
      </h2>

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
          marginTop: "30px",
          width: "350px"
        }}
      >

        <p style={{ marginBottom: "15px", fontSize: "18px" }}>
          🔥 {streak} Day Mindfulness Streak
        </p>

        <div style={{ fontSize: "50px" }}>

          <span onClick={() => selectMood("Happy")} style={{ cursor: "pointer", margin: "15px" }}>😊</span>
          <span onClick={() => selectMood("Neutral")} style={{ cursor: "pointer", margin: "15px" }}>😐</span>
          <span onClick={() => selectMood("Sad")} style={{ cursor: "pointer", margin: "15px" }}>😢</span>
          <span onClick={() => selectMood("Angry")} style={{ cursor: "pointer", margin: "15px" }}>😡</span>

        </div>

        {todayMood && (
          <p
            style={{
              marginTop: "25px",
              fontSize: "20px",
              color: "#444"
            }}
          >
            You are feeling <b>{todayMood}</b> today
          </p>
        )}

      </div>

      {/* Mood History */}

      <div
        style={{
          marginTop: "50px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }}
      >

        <h3 style={{ marginBottom: "15px" }}>
          Mood History
        </h3>

        {moodHistory.length === 0 ? (
          <p style={{ color: "#777" }}>
            No moods recorded yet
          </p>
        ) : (

          moodHistory
            .slice()
            .reverse()
            .map((entry, index) => (

              <p key={index} style={{ margin: "6px 0" }}>
                {entry.date} — <b>{entry.mood}</b>
              </p>

            ))

        )}

      </div>

    </div>
  );
}

export default MoodTracker;