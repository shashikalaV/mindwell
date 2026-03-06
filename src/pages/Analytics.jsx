import { useEffect, useState } from "react";
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts";

function Analytics(){

const [data,setData] = useState([]);

const moodValue = {
Happy:4,
Neutral:3,
Sad:2,
Angry:1
};

const moodEmoji = {
Happy:"😊",
Neutral:"😐",
Sad:"😢",
Angry:"😡"
};

useEffect(()=>{

const moods = JSON.parse(localStorage.getItem("moods")) || [];

const formatted = moods.map((entry)=>({
date: entry.date,
mood: moodValue[entry.mood],
label: entry.mood
}));

setData(formatted);

},[]);

return(

<div style={{
width:"80%",
margin:"auto",
marginTop:"40px"
}}>

<h2 style={{textAlign:"center"}}>Mood Analytics</h2>
<p style={{textAlign:"center"}}>Your emotional trend</p>

{/* WEEKLY SUMMARY */}

<div style={{
marginTop:"30px",
padding:"20px",
background:"#f5f7fa",
borderRadius:"10px"
}}>

<h3>This Week</h3>

{data.length === 0 ? (
<p>No mood history yet</p>
) : (

data.map((item,index)=>(
<p key={index}>
{item.date} — {moodEmoji[item.label]} {item.label}
</p>
))

)}

</div>


{/* GRAPH */}

<div style={{marginTop:"40px"}}>

{data.length === 0 ? (

<p style={{textAlign:"center"}}>Track your mood to see analytics</p>

) : (

<ResponsiveContainer width="100%" height={300}>

<LineChart data={data}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="date" />

<YAxis
domain={[1,4]}
ticks={[1,2,3,4]}
/>

<Tooltip />

<Line
type="monotone"
dataKey="mood"
stroke="#6C63FF"
strokeWidth={3}
dot={{ r:6 }}
/>

</LineChart>

</ResponsiveContainer>

)}

</div>

</div>

);

}

export default Analytics;