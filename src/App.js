import { useState } from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./Component/About";
import Alert from "./Component/Alert";
import Footer  from "./Component/Footer";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Navbar from "./Component/Navbar";
import Signup from "./Component/Signup";
import NoteState from "./Context/NoteState";



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
     <Navbar/>
     <Alert alert={alert}/>
     <div className="container">
     <Routes>
       <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
       <Route exact path="/about" element={<About/>}/>
       <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
       <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
     </Routes>
     </div>
     <Footer/>
     </Router>
     </NoteState>
    </>
  );
}

export default App;
