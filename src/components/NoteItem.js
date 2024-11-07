import React,{ useContext } from "react";
import Context from "../context/notes/NoteContext.js";
import { AlertContext } from "../context/alerts/AlertContext.js";

const NoteItem = (props) => {
  const {showAlert} = useContext(AlertContext);
    const context = useContext(Context);
    const {deleteNote} = context; 
  const { note,update } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description.length>60?note.description.slice(0,60) + "...":note.description}</p>
          <i className="fa-solid fa-trash mx-3" title="delete" onClick={()=>{deleteNote(note._id);showAlert("Note Deleted","success")}}/>
          <i className="fa-solid fa-pen-to-square mx-3" title="edit" onClick={()=>update(note)} />
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
