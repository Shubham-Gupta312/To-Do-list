import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  let location = useLocation();
  let navigate =  useNavigate();
  const handleLogout =() => {
    localStorage.removeItem("auth-token");
    navigate('/login');
  }
  useEffect(() => {
    // console.log(location.pathname);
  },[location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand"  style={{ color: "#ba5bf4" }} to="#">
          To-do List
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname}==="/home" ? "active' : "" `} aria-current="page" id="home" style={{ color: "#ba5bf4", marginTop: '7px' }} to="/home">
                  Home
                </Link>
              </li>
              <li className={`nav-link ${location.pathname}==="/about" ? "active' : "" `}>
                <Link className="nav-link" style={{ color: "#ba5bf4" }} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("auth-token") ?
<form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" style={{ color: "#ba5bf4", background: "#0a192f" }} role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" style={{ color: "#ba5bf4", background: "#0a192f" }} role="button">Sign-Up</Link>
            </form>: <button onClick={handleLogout}
            style={{ color: "#ba5bf4", background: "#0a192f" }} className="btn btn-primary">LogOut</button> }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
