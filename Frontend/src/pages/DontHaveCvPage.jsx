import React from "react";
import NavBar from "../component/navBar/NavBar";
import DontHave from "../component/dontHaveCv/Index";

export default function DontHaveCvPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="dontHaveCvPageContainer">
        <DontHave />
      </div>
    </div>
  );
}
