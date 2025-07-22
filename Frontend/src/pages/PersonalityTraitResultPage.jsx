import React from "react";
import NavBar from "../component/navBar/NavBar";
import Result from "../component/personalityResult/Index";

export default function PersonalityTraitResultPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="personalityTraitResultPageContainer">
        <Result />
      </div>
    </div>
  );
}
