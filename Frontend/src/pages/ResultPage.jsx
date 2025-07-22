import React from "react";
import NavBar from "../component/navBar/NavBar";
import Result from "../component/result/Index";

export default function ResultPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="resultPageContainer">
        <Result />
      </div>
    </div>
  );
}
