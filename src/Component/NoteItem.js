import React,{useContext} from "react";
import noteContext from "../Context/noteContext";


const NoteItem = (props) => {

  const handleDel=()=>{
    deleteNote(note._id)
    props.showAlert("Deleted Successfully!!", 'success');
  }

  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="far fa-trash-alt" onClick={handleDel}></i>
          <i className="far fa-edit mx-3" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
