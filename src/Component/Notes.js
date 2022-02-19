import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;

  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // console.log("UPDATING NOTE", note)
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated-Successfully!!", "success");
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit-Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    aria-describedby="emailHelp"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChange}
                    value={note.edescription}
                    id="edescription"
                    name="edescription"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChange}
                    value={note.etag}
                    id="etag"
                    name="etag"
                    required
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
                onClick={handleUpdate}
                disabled={note.etitle < 5 || note.edescription < 5}
                className="btn btn-primary"
              >
                Update-Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <div className="text-center mt5">
          <h2>Your Notes</h2>
        </div>
        <div className="container mx-2">
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
