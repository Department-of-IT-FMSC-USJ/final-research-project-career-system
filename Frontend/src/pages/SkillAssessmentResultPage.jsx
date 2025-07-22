import React from "react";
import NavBar from "../component/navBar/NavBar";
import Result from "../component/skillAssessmentResult/Index";

export default function SkillAssessmentResultPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="skillAssessmentResultPageContainer">
        <Result />
      </div>
    </div>
  );
}
