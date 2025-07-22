import React from "react";
import { useNavigate } from "react-router-dom";
import HomeImage from "../../assets/images/home.png";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();

  const clickAssesment = () => {
    navigate("/data-extraction");
  };
  return (
    <div>
      <div className="homeContainer">
        <div className="homeLeft">
          <div className="homeLeftHeader">
            <span>Confused about your IT career ?</span>
          </div>
          <div className="homrLeftSubHeader">
            <span>
              Discover your best-fit IT career with our simple and quick career
              path test.
            </span>
          </div>
          <div className="assestmentBtn">
            <span onClick={clickAssesment}>Start Assessment</span>
          </div>
          <div className="takeTimeText">
            <span>It takes about 15-17 minutes.</span>
          </div>
        </div>
        <div className="homeRight">
          <div className="homeRightImage">
            <img src={HomeImage} alt="home" className="homeImage" />
          </div>
        </div>
      </div>
    </div>
  );
}
