import React from "react";
import NavBar from "../component/navBar/NavBar";
import Home from "../component/home/Home";
import HowItWork from "../component/howItWork/Index";
import ITCareers from "../component/itCareers/Index";

export default function LandingPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <section id="home">
        <Home />
      </section>
      <section id="howItWork">
        <HowItWork />
      </section>
      <section id="itCareers">
        <ITCareers />
      </section>
    </div>
  );
}
