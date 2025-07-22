import React from "react";
import NavBar from "../component/navBar/NavBar";
import UploadCV from "../component/uploadCV/Index";

export default function DataExtractionPage() {
  return (
    <div>
      <section id="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </section>
      <div className="dataExtractionPageContainer">
        <UploadCV />
      </div>
    </div>
  );
}
