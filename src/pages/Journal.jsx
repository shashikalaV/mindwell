import { useState, useEffect } from "react";

function Journal() {

  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {

    const storedEntries = JSON.parse(localStorage.getItem("journals")) || [];
    setEntries(storedEntries);

  }, []);

  const saveEntry = () => {

  if (entry.trim() === "") return;

  const today = new Date().toISOString().split("T")[0];

  const storedEntries = JSON.parse(localStorage.getItem("journals")) || [];

  const existingIndex = storedEntries.findIndex(
    e => e.date === today
  );

  if (existingIndex !== -1) {

    storedEntries[existingIndex].text = entry;

  } else {

    storedEntries.push({
      text: entry,
      date: today
    });

  }

  localStorage.setItem("journals", JSON.stringify(storedEntries));

  setEntries(storedEntries);
  setEntry("");

};

  return (

    <div style={{maxWidth:"700px", margin:"auto", padding:"40px"}}>

      <h2 style={{textAlign:"center"}}>Daily Journal</h2>

      <textarea
        rows="6"
        placeholder="Write about your thoughts today..."
        value={entry}
        onChange={(e)=>setEntry(e.target.value)}
        style={{
          width:"100%",
          padding:"15px",
          marginTop:"20px",
          borderRadius:"10px",
          border:"1px solid #ccc",
          fontSize:"16px"
        }}
      />

      <button
        onClick={saveEntry}
        style={{
          marginTop:"15px",
          padding:"10px 20px",
          border:"none",
          borderRadius:"8px",
          background:"#4CAF50",
          color:"white",
          cursor:"pointer"
        }}
      >
        Save Entry
      </button>

      <h3 style={{marginTop:"40px"}}>Journal History</h3>

      {entries.length === 0 ? (
        <p>No journal entries yet</p>
      ) : (

        entries.map((item, index) => (

          <div
            key={index}
            style={{
              background:"#f9f9f9",
              padding:"15px",
              borderRadius:"10px",
              marginTop:"15px",
              boxShadow:"0 2px 5px rgba(0,0,0,0.1)"
            }}
          >

            <small style={{color:"#666"}}>{item.date}</small>

            <p style={{marginTop:"8px"}}>{item.text}</p>

          </div>

        ))

      )}

    </div>

  );
}

export default Journal;