import React from "react";
import NavBar from "../component/navBar/NavBar";
import PersonalityTrait from "../component/personalityTrait/Index";

export default function PersonalityTraitPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="personalityTraitPageContainer">
        <PersonalityTrait />
      </div>
    </div>
  );
}
