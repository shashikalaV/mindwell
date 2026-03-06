import { useState } from "react";

function Journal() {

  const [entry, setEntry] = useState("");

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("journalEntries")) || []
  );

  const saveEntry = () => {

    if(entry.trim() === "") return;

    const newEntry = {
      text: entry,
      date: new Date().toLocaleDateString()
    };

    const updatedHistory = [newEntry, ...history];

    setHistory(updatedHistory);

    localStorage.setItem(
      "journalEntries",
      JSON.stringify(updatedHistory)
    );

    setEntry("");
  };

  return (

    <div style={{
      maxWidth:"800px",
      margin:"auto",
      marginTop:"40px",
      padding:"20px"
    }}>

      <h2 style={{textAlign:"center"}}>
        Daily Journal
      </h2>

      <p style={{
        textAlign:"center",
        color:"#666"
      }}>
        Write your thoughts and reflections
      </p>

      <div style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
        marginTop:"20px"
      }}>

        <textarea
          rows="5"
          placeholder="Write your thoughts..."
          value={entry}
          onChange={(e)=>setEntry(e.target.value)}
          style={{
            width:"100%",
            padding:"10px",
            borderRadius:"8px",
            border:"1px solid #ddd",
            resize:"none"
          }}
        />

        <button
          onClick={saveEntry}
          style={{
            marginTop:"15px",
            padding:"10px 20px",
            background:"#4CAF50",
            color:"white",
            border:"none",
            borderRadius:"6px",
            cursor:"pointer"
          }}
        >
          Save Entry
        </button>

      </div>

      <h3 style={{marginTop:"40px"}}>

        Journal History

      </h3>

      {history.map((item,index)=>(

        <div
          key={index}
          style={{
            background:"#fff",
            padding:"15px",
            borderRadius:"10px",
            marginTop:"15px",
            boxShadow:"0 3px 8px rgba(0,0,0,0.1)"
          }}
        >

          <p>{item.text}</p>

          <small style={{color:"#777"}}>

            {item.date}

          </small>

        </div>

      ))}

    </div>
  );
}

export default Journal;