import React from "react";
import NavBar from "../component/navBar/NavBar";
import Question from "../component/interestTestQuestion/Index";

export default function InterestTestQuestionPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="interestTestQuestionPageContainer">
        <Question />
      </div>
    </div>
  );
}
