import React from "react";
import Clock from "../../assets/images/clock.png";
import Heart from "../../assets/images/heart.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const personalityresultData = location.state?.personalityresults || [];
  const cvResultData = location.state?.responseData || [];

  const clickStartButton = () => {
    navigate("/interest-test-question", {
      state: {
        personalityresults: personalityresultData,
        responseData: cvResultData,
      },
    });
  };

  return (
    <div>
      <div className="interestTestContainer">
        <div className="interestTestContent">
          <div className="interestTestContentLeft">
            <div className="leftContentBody">
              <div className="brainImage">
                <img src={Heart} alt="Heart" className="heart" />
              </div>
              <div className="leftContentTitle">
                <span>Discover Your Work Interests</span>
              </div>
              <div className="timeDuration">
                <span>
                  <img src={Clock} alt="clock" className="clock" />
                  &nbsp; Estimated Time: Under 5 minutes
                </span>
              </div>
              <div className="leftContentDescription">
                <span>
                  Understanding the type of work you enjoy is key to finding the
                  right IT career. In this step, you’ll answer 18 short
                  questions based on 6 key interest areas, inspired by the
                  RIASEC model
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
                <span onClick={clickStartButton}>Start Interest test</span>
              </div>
            </div>
          </div>
          <div className="interestTestContentRight">
            <div class="stepper-container">
              <div class="step active">
                <div class="step-number">1</div>
                <div class="step-label">
                  <strong style={{ color: "#9B9BA0" }}>Upload CV</strong>
                </div>
              </div>
              <div class="step active">
                <div class="step-number">2</div>
                <div class="step-label" style={{ color: "#9B9BA0" }}>
                  Personality Test
                </div>
              </div>
              <div class="step active">
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
