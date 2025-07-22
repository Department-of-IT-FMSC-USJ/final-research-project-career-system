import React from "react";
import NavBar from "../component/navBar/NavBar";
import Test from "../component/interestTest/Index";

export default function InterestTestPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="interestTestPageContainer">
        <Test />
      </div>
    </div>
  );
}
