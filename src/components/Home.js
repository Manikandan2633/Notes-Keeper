import React, { useEffect, useState } from "react";
import "./Home.css";
import  Alert  from "@mui/material/Alert";
const Home = ({
  title,
  setTitle,
  tagline,
  setTagline,
  description,
  setDescription,
  notes,
  setNotes,
}) => {
  const [notesSuccess,setNotesSuccess] = useState(false);
  const addNoteHandler = (e) => {
    e.preventDefault();

    setNotes((note) => [
      ...note,
      { title, tagline, description, id: notes.length + 1 },
    ]);
    setTitle("");
    setTagline("");
    setDescription("");
    setNotesSuccess(true);
  };
  useEffect(() => {
    let timer;
    if (notesSuccess) {
      timer = setTimeout(() => {
        setNotesSuccess(false);
      }, 3000); // Adjust the duration (in milliseconds) as needed
    }
    return () => {
      clearTimeout(timer);
    };
  }, [notesSuccess]);
  return (
    <div className="home-container">
      <header>
        <h1>Notes Keeper Application</h1>
      </header>
      <div className="notes-form">
        <form onSubmit={addNoteHandler}>
          <h3>Take a Notes👇</h3>
          {notesSuccess ?  <Alert variant="filled" severity="success">
        Notes added successfully.
      </Alert> : ""}
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Tages"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />
          <textarea
            name="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button>Add a Note</button>
        </form>
        
      </div>
    </div>
  );
};

export default Home;
