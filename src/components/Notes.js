import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "../context/notes/NoteContext.js";
import NoteItem from "./NoteItem.js";
import { AlertContext } from "../context/alerts/AlertContext.js";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const context = useContext(Context);
  const { notes, updateNote, getNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  const update = (currentNote) => {
    ref.current.click();
    setNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      id: currentNote._id,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    updateNote(note.etitle, note.edescription, note.etag, note.id);
    refClose.current.click();
    showAlert("Note Updated", "success");
  };

  const onChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      <h5>Title</h5>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      <h5>Description</h5>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      <h5>Tag</h5>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={
                    note.etitle.length < 3 || note.edescription.length < 5
                  }
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.length == 0 ? (
          <div className="noNote d-flex"><p id='noNoteMsg'>No notes to show.</p><i id="Empty" className="fa-regular fa-face-sad-tear"></i></div>
        ) : (
          notes.map((note) => {
            return <NoteItem update={update} key={note._id} note={note} />;
          })
        )}
      </div>
    </>
  );
};

export default Notes;
