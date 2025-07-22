import React from "react";
import BrainImage from "../../assets/images/brain.png";
import Clock from "../../assets/images/clock.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const cvResultData = location.state?.responseData || [];

  const clickStartButton = () => {
    navigate("/personality-traits-question", {
      state: { responseData: cvResultData },
    });
  };
  return (
    <div>
      <div className="personalityTraitContainer">
        <div className="personalityTraitContent">
          <div className="personalityTraitContentLeft">
            <div className="leftContentBody">
              <div className="brainImage">
                <img src={BrainImage} alt="Brain" className="brainImg" />
              </div>
              <div className="leftContentTitle">
                <span>Discover Your Personality Traits</span>
              </div>
              <div className="timeDuration">
                <span>
                  <img src={Clock} alt="clock" className="clock" />
                  &nbsp; Estimated Time: Under 5 minutes
                </span>
              </div>
              <div className="leftContentDescription">
                <span>
                  Your personality plays a key role in finding a career that
                  fits you best. In this step, you'll answer 15 short questions
                  based on the Big Five Personality Traits:
                </span>
              </div>
              <div className="subDescription">
                <span>Each trait includes 3 simple questions.</span>
              </div>
              <div className="buttonText">
                <span>
                  There are no right or wrong answers — just choose what
                  reflects you the most.
                </span>
              </div>

              <div className="testStartButton">
                <span onClick={clickStartButton}>Start Personality test</span>
              </div>
            </div>
          </div>
          <div className="personalityTraitContentRight">
            <div class="stepper-container">
              <div class="step active">
                <div class="step-number">1</div>
                <div class="step-label">
                  <strong style={{ color: "#9B9BA0" }}>Upload CV</strong>
                </div>
              </div>
              <div class="step active">
                <div class="step-number">2</div>
                <div class="step-label">Personality Test</div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-label">Interest Identification</div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-label">Skill identification</div>
              </div>
              <div class="step">
                <div class="step-number">5</div>
                <div class="step-label">Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
