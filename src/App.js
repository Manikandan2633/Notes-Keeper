import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function App() {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState(getNotes);
  const [edit, setEdit] = useState("");
  const [currentPage, setCurrentPage] = useState("1");
  localStorage.setItem("notes", JSON.stringify(notes));

  const notesPerPage = 6;
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  const notesToShow = notes.slice(startIndex, endIndex);
  return (
    <div className="app">
      <Home
        title={title}
        tagline={tagline}
        description={description}
        setTitle={setTitle}
        setTagline={setTagline}
        setDescription={setDescription}
        notes={notes}
        setNotes={setNotes}
      />
      {notes.length === 0 ? (
        <h1 className='no-notes'>No notes to display</h1>
      ) : (
       
          <div className="notes-display" >
            <Notes notes={notes} setNotes={setNotes} setEdit = {setEdit} notesToShow={notesToShow}/>
          </div>
      )}
      <div className="mt-auto">
        {notes.length !== 0 ? (
        <Stack spacing={4} alignItems={"center"}>
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Stack>
        ) : ""}
      </div>
    </div>
  );
  function getNotes() {
    const note = localStorage.getItem("notes");
    if (note) {
      return JSON.parse(note);
    } else {
      return [];
    }
  }
}

export default App;
