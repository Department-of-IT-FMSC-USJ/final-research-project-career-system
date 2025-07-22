import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import "primeicons/primeicons.css";

export default function NavBar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="navBarContainer">
      <div className="continer" id="headerContainer">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light">
            <center>
              <div
                id="logoDiv"
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
              >
                <span className="logoText">
                  <span className="logoTextCareer">Career</span>Guru
                </span>
              </div>
            </center>

            <i
              id="toggleBtn"
              onClick={toggleNavbar}
              className={`pi ${
                isNavbarOpen ? "pi-times" : "pi-align-justify"
              } navbar-toggler`}
            ></i>

            <div className="container-fluid">
              <div
                className={`collapse navbar-collapse ${
                  isNavbarOpen ? "show" : ""
                }`}
              >
                <ul
                  className="navbar-nav me-auto ms-auto mb-3 mb-lg-0"
                  id="list"
                >
                  <li className="nav-item active">
                    <a
                      className="nav-link"
                      href="#1"
                      id="homeText"
                      onClick={() => scrollToSection("header")}
                    >
                      Home
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#1"
                      id="navName"
                      onClick={() => scrollToSection("howToOur")}
                    >
                      Explore careers
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#1"
                      id="navName"
                      onClick={() => scrollToSection("howToPurchase")}
                    >
                      Career advisors
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#1"
                      id="navName"
                      onClick={() => scrollToSection("frequentlyAsked")}
                    >
                      Contact
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
