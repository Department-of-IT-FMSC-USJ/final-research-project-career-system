import React from "react";
import AvrImage from "../../assets/images/howIt.png";
import "./style.css";

export default function Index() {
  return (
    <div>
      <div className="howItWorkContainer">
        <div className="howItWorkTitle">
          <span>How it works</span>
        </div>
        <div className="howItWorkContent">
          <div className="howItWorkLeft">
            <div>
              <div className="howItWorkLeftContentTitle">
                <span className="numberText">1</span>&nbsp;&nbsp;&nbsp;
                <span className="howItWorkLeftContentTitleText">
                  Identify Your Personality Traits
                </span>
              </div>
              <div className="howItWorkLeftContentSubTitle">
                <span>
                  Gain insights into the traits that shape your career
                  preferences.
                </span>
              </div>
            </div>
            <br />
            <br />

            <div>
              <div className="howItWorkLeftContentTitle">
                <span className="numberText">2</span>&nbsp;&nbsp;&nbsp;
                <span className="howItWorkLeftContentTitleText">
                  Identify Your Work Interests
                </span>
              </div>
              <div className="howItWorkLeftContentSubTitle">
                <span>
                  Discover the IT fields and tasks you are passionate about.
                </span>
              </div>
            </div>
            <br />
            <br />

            <div>
              <div className="howItWorkLeftContentTitle">
                <span className="numberText">3</span>&nbsp;&nbsp;&nbsp;
                <span className="howItWorkLeftContentTitleText">
                  Assess Your Skills
                </span>
              </div>
              <div className="howItWorkLeftContentSubTitle">
                <span>Evaluate your strengths and areas for growth in IT.</span>
              </div>
            </div>
            <br />
            <br />

            <div>
              <div className="howItWorkLeftContentTitle">
                <span className="numberText">4</span>&nbsp;&nbsp;&nbsp;
                <span className="howItWorkLeftContentTitleText">
                  Get Matched with Your Best-Fit IT Career
                </span>
              </div>
              <div className="howItWorkLeftContentSubTitle">
                <span>
                  Receive personalized IT career recommendations tailored to
                  you.
                </span>
              </div>
            </div>
          </div>
          <div className="howItWorkRight">
            <div className="howItWorkRightImageContainer">
              <img
                src={AvrImage}
                alt="How It Works"
                className="howItWorkImage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
