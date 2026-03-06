import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import CalendarHeatmap from "react-calendar-heatmap";

function Analytics() {

  const [data, setData] = useState([]);

  const moodValue = {
    Happy: 4,
    Neutral: 3,
    Sad: 2,
    Angry: 1
  };

  useEffect(() => {

    const storedMoods = JSON.parse(localStorage.getItem("moods")) || [];

    const formattedData = storedMoods.map((entry) => ({
      date: entry.date,
      mood: moodValue[entry.mood]
    }));

    setData(formattedData);

  }, []);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>

      <h2>Your Mood Analytics</h2>

      {data.length === 0 ? (
        <p>No mood data yet</p>
      ) : (

        <>
        
        {/* LINE GRAPH */}

        <LineChart width={700} height={350} data={data}>

          <CartesianGrid stroke="#ddd" />

          <XAxis dataKey="date" />

          <YAxis
            ticks={[1,2,3,4]}
            tickFormatter={(value)=>{
              if(value===4) return "Happy"
              if(value===3) return "Neutral"
              if(value===2) return "Sad"
              if(value===1) return "Angry"
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="mood"
            stroke="#6C63FF"
            strokeWidth={4}
            dot={{ r:6 }}
          />

        </LineChart>

        {/* HEATMAP */}

        <h3 style={{marginTop:"60px"}}>Mood Calendar</h3>

        <CalendarHeatmap
          startDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
          endDate={new Date()}
          values={data}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            if (value.mood === 4) return "color-happy";
            if (value.mood === 3) return "color-neutral";
            if (value.mood === 2) return "color-sad";
            if (value.mood === 1) return "color-angry";
          }}
        />

        </>

      )}

    </div>
  );
}

export default Analytics;