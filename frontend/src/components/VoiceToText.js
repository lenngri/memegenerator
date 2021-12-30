import React, { useState, useEffect } from "react";
import "../components/VoiceToText.css";
import TextField from "@mui/material/TextField";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function VoiceToText() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [name, setName] = React.useState();
  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    const handleListen = () => {
      if (isListening) {
        mic.start();
        mic.onend = () => {
          console.log("continue..");
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          console.log("Stopped Mic on Click");
        };
      }
      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setNote(transcript);
        mic.onerror = (event) => {
          console.log(event.error);
        };
      };
    };
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log(event.currentTarget);
  };

  return (
    <>
      <h1>Voice to Text</h1>
      <div className="container">
        <div className="box">
          <h2>Current Text</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save as Title
          </button>
          <button onClick={handleSaveNote} disabled={!note}>
            Save as Caption 1
          </button>
          <button onClick={handleSaveNote} disabled={!note}>
            Save as Caption 2
          </button>
          <button onClick={handleSaveNote} disabled={!note}>
            Save as Caption 3
          </button>

          <button onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
      </div>
      <div style={{ paddingLeft: 50 }}>
        <TextField
          id="outlined-basic"
          label={note ? "" : "Title"}
          variant="outlined"
          value={name ? name : note}
          onChange={handleChange}
          onClick={() => setIsListening((prevState) => !prevState)}
        />
      </div>
      <div style={{ paddingLeft: 50 }}>
        <TextField id="outlined-basic" label="Caption 1" variant="outlined" />
      </div>
      <div style={{ paddingLeft: 50 }}>
        <TextField id="outlined-basic" label="Caption 2" variant="outlined" />
      </div>
      <div style={{ paddingLeft: 50 }}>
        <TextField id="outlined-basic" label="Caption 3" variant="outlined" />
      </div>

      <div className="box">
        <h2>Title</h2>
        {savedNotes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
      <div className="box">
        <h2>Caption 1</h2>
        {savedNotes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
      <div className="box">
        <h2>Caption 2</h2>
        {savedNotes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
      <div className="box">
        <h2>Caption 3</h2>
        {savedNotes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
    </>
  );
}

export default VoiceToText;
