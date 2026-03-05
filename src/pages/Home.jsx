import MoodTracker from "../components/MoodTracker";

function Home() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Welcome to MindWell</h1>
      <p>Your personal space for mindfulness and mood tracking.</p>

      <MoodTracker />
    </div>
  );
}

export default Home;