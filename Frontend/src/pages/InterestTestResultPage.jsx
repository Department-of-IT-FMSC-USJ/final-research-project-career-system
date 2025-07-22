import React from "react";
import NavBar from "../component/navBar/NavBar";
import Result from "../component/interestTestResult/Index";

export default function InterestTestResultPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="interestTestResultPageContiner">
        <Result />
      </div>
    </div>
  );
}
