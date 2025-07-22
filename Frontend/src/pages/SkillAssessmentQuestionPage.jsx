import React from "react";
import NavBar from "../component/navBar/NavBar";
import Question from "../component/skillAssessmentQuestion/Index";

export default function SkillAssessmentQuestionPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="skillAssessmentQuestionPageContainer">
        <Question />
      </div>
    </div>
  );
}
