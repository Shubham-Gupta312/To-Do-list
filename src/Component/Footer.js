import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const emailStyle = {
    color: "#CCD6F6",
    textDecoration: "none",
  };
  return (
    <div>
      <footer className="footer text-center text-lg-start mt-5" style={{background: "#b2b3d7"}}>
        <div className="footer container p-4">
          <div className="row">
            <div className="footer col-lg-6 col-md-12 mb-4 mb-md-0">
              <h3 className=""><span style={{ color: "#ba5bf4"}}>To-do List</span> -Your Notes secure On Cloud</h3>

              <p style={{ textAlign: "justify" }}>
                Hii..., A very Welcome to all of you at <b>To-do List-Your Notes secure On Cloud</b>. This is an
                online note-taking web app. It is made up with help of MERN FULL
                STACK and UI is Develop with BOOTSTRAP.
                Basically, it's a cloud-based note-taking web app where you can
                note down your Important Notes and save them to the Cloud. It is
                Fully Secure. It is Easy and Free to use.
              </p>
            </div>

            <div className="footer col-lg-6 col-md-12 mb-4 mb-md-0">
              <h3>Contact Us</h3>

              <ul>
                <li>
                  <h5>Shubham Gupta</h5>
                </li>
                <li>
                  <a
                    style={emailStyle}
                    href="mailto:shubhamgupta7082@gmail.com"
                  >
                    Email Me
                  </a>
                </li>
              </ul>

              <div className="container">
                <a
                  href="https://www.linkedin.com/in/shubham-gupta-5588a6200/"
                  role="button"
                  style={{ fontSize: "14px" }}
                  target="_blank"
                  rel="noreferrer"
                  className="btn  btn-floating btn-outline-dark mx-2 icon"
                >
                  <i className="fab fa-linkedin"></i>
                </a>

                <a
                  role="button"
                  href="https://www.instagram.com/shubhamgupta6958/"
                  style={{ fontSize: "14px" }}
                  target="_blank"
                  rel="noreferrer"
                  className="btn  btn-outline-dark  btn-floating mx-2 icon"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  role="button"
                  href="https://twitter.com/Shubham78581589"
                  style={{ fontSize: "14px" }}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark  btn-floating mx-2 icon"
                >
                  <i className="fab fa-twitter"></i>
                </a>

                <a
                  role="button"
                  href="https://github.com/Shubham-Gupta312"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "14px" }}
                  className="btn btn-outline-dark  btn-floating mx-2 icon"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            {/* <!--Grid column--> */}
          </div>
          {/* <!--Grid row--> */}
        </div>
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: CTA --> */}
          <section className="">
            {!localStorage.getItem("auth-token") ? (
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Register for free</span>
                <Link
                  type="button"
                  className="btn btn-outline-dark rounded-pill "
                  to="/signup"
                  style={{ background: "#64ffda", color: "#0a192f" }}
                >
                  Sign up!
                </Link>
              </p>
            ) : null}
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2021 Copyright:
          <a
            style={{ color: "white", textDecoration: "none" }}
            href="https://www.linkedin.com/in/shubham-gupta-5588a6200/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Shubham Gupta
          </a>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
