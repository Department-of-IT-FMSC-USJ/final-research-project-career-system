import React from "react";
import NavBar from "../component/navBar/NavBar";
import Questions from "../component/personalityTraitsQuestion/Index";

export default function PersonalityTraitsQuestionPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="personalityTraitsQuestionPageContainer">
        <Questions />
      </div>
    </div>
  );
}
