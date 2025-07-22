import React from "react";
import NavBar from "../component/navBar/NavBar";
import Skill from "../component/skillAssestment/Index";

export default function SkillAssesmentPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="skillAssesmentPageContainer">
        <Skill />
      </div>
    </div>
  );
}
