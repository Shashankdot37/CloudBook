import NoteContext from "./NoteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  const getNote = async () => {
    //API Call
    const response = await fetch(`${host}/note/fetchnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setNotes(json)
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/note/createnote`, {
      method: "POST",
      body: JSON.stringify({ title, description, tag }),
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Update Note
  const updateNote = async (title, description, tag, id) => {
    //API Call
    const response = await fetch(`${host}/note/updatenote/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, description, tag }),
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    console.log(response.status);

    const newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit the note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }
    });
    let json = null;
    if(response.headers.get("Content-Type")?.includes("application/json")){
      // eslint-disable-next-line
      json = await response.json()
    }
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <>
      <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote,getNote }}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
