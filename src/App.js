
import React, { useState } from "react";
import "./App.css";

function App() {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("Loading...");
    try {
      const res = await fetch("https://good-day-final.onrender.com/check_day", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event, date: date || "today" }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error contacting the bot.");
    }
  };

  return (
    <div className="App">
      <h1>Good Day Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event (e.g., marriage)"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Check</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default App;
