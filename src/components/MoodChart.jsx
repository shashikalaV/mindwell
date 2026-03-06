import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function MoodChart() {

  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];

  const moodValue = {
    Happy: 4,
    Neutral: 3,
    Sad: 2,
    Angry: 1,
  };

  const data = {
    labels: history.map(item => item.date),

    datasets: [
      {
        label: "Mood Trend",
        data: history.map(item => moodValue[item.mood]),
      },
    ],
  };

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <Line data={data} />
    </div>
  );
}

export default MoodChart;