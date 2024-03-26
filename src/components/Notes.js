import React, { useState } from "react";
import './Notes.css'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CardActions } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Notes = ({ notes, setNotes, setEdit, notesToShow }) => {
  const [showFullDescription, setShowFullDescription] = useState({});
  const [fullDescription, setFullDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenDesc = () => setOpenDesc(true);
  const handleClose = () => setOpen(false);
  const handleCloseDesc = () => setOpenDesc(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedTagline, setEditedTagline] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedId, setEditedId] = useState("");
  
  const editHandler = (id) => {
    const noteToEdit = notes.find((res) => res.id === id);
    setEditedId(id);
    if (noteToEdit) {
      setEditedTitle(noteToEdit.title);
      setEditedTagline(noteToEdit.tagline);
      setEditedDescription(noteToEdit.description);
      handleOpen();
    }
  };

  const removeHandler = (id) => {
    const newNotes = notes.filter((res) => res.id !== id);
    setNotes(newNotes);
  };

  const handleUpdate = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: editedTitle,
          tagline: editedTagline,
          description: editedDescription,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
    handleClose();
  };
  const toggleShowFullDescription = (noteId) => {
    const fullDesc = notes.find((note) => note.id === noteId)?.description;
    if (fullDesc) {
      setFullDescription(fullDesc);
      handleOpenDesc();
    }
    handleClose();
  };
  return (
    <div className="notes-container">
      <Grid
       
        container
        spacing={3}
        style={{ maxWidth: "1000px", margin: "20px auto" }}
      >
        {notesToShow.map((note) => (
          <Grid key={note.id} xs={12} sm={6} md={4} lg={4}>
            <Card sx={{ maxWidth: 275, width: "100%",boxShadow: 3 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {note.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {note.tagline}
                </Typography>
                <Typography variant="body2">
                  {note.description.length > 50 &&
                  !showFullDescription[note.id] ? (
                    <>
                      {`${note.description.slice(0, 50)}...`}
                      <Button
                        size="small"
                        onClick={() => toggleShowFullDescription(note.id)}
                      >
                        Read more
                      </Button>
                    </>
                  ) : (
                    note.description
                  )}
                </Typography>
              </CardContent>
              <CardActions>
                <ModeEditOutlineIcon
                  onClick={() => {
                    editHandler(note.id);
                    handleOpen();
                  }}
                  style={{ cursor: "pointer" }}
                />
                <DeleteIcon
                  onClick={() => {
                    removeHandler(note.id);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style}>
              <form className="edit-form">
                <h3 className="edit-title">Edit Note</h3>
                <input
                    placeholder="Title"
                    id="title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <input
                    name="tagline"
                    id="tagline"
                    value={editedTagline}
                    onChange={(e) => setEditedTagline(e.target.value)}
                  />
                   <textarea
                    placeholder="Description"
                    id="description"
                    name="description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows="4"
                    cols="50"
                  ></textarea>
                <Button
                  variant="outlined"
                  startIcon={<ModeEditOutlineIcon />}
                  onClick={() => handleUpdate(editedId)}
                >
                  Edit Note
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDesc}
        onClose={handleCloseDesc}
        closeAfterTransition
      >
        <Fade in={openDesc}>
          <Box sx={style}>
            <Typography variant="h6" id="transition-modal-title" gutterBottom>
              Full Description
            </Typography>
            <Typography variant="body1" id="transition-modal-description">
              {fullDescription}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Notes;
