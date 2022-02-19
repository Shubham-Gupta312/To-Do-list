import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = " http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //   GET ALL NOTES
  const getNote = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
        
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
        
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    // console.log(note);
    
    // LOGIC TO ADD NOTE
    // console.log("Add a Note");   
  };

  //DELETE A NOTE
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
        
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    // console.log(json);

    // console.log("Delete a note", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    // console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes)) // making a new ARRAY of notes 

    //LOGIC TO EDIT A NOTE
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      }
    }
    // console.log(id,newNotes)
    setNotes(newNotes)
  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
