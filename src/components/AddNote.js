import React, { useState, useContext } from "react";
import Context from "../context/notes/NoteContext.js";
import { AlertContext } from "../context/alerts/AlertContext.js";

const AddNote = () => {
  const {showAlert} = useContext(AlertContext)
    const [note, setNote] = useState({title:"",description:"",tag:""});
  const { addNote } = useContext(Context);
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});
    showAlert("Note Added Successfully.","success");
  };

  const onChange = (e) => {
    e.preventDefault();
    setNote({...note, [e.target.name]:e.target.value})
  };
  return (
    <div className="container my-3">
      <h2>Add your note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <h5>Title</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <h5>Description</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value = {note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            <h5>Tag</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<3||note.description.length<5}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
