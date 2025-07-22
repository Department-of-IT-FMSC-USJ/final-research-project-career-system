import React from "react";
import Clock from "../../assets/images/clock.png";
import Computer from "../../assets/images/computer.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const personalityresultData = location.state?.personalityresults || [];
  const interestresultData = location.state?.interestResult || [];
  const cvResultData = location.state?.responseData || [];

  const clickStartButton = () => {
    navigate("/skill-assesstment-question", {
      state: {
        personalityresults: personalityresultData,
        interestResult: interestresultData,
        responseData: cvResultData,
      },
    });
  };
  return (
    <div>
      <div className="skillAssestmentContent">
        <div className="skillAssestmentContent">
          <div className="skillAssestmentContentLeft">
            <div className="leftContentBody">
              <div className="brainImage">
                <img src={Computer} alt="Computer" className="Computer" />
              </div>
              <div className="leftContentTitle">
                <span>Assess Your Skills</span>
              </div>
              <div className="timeDuration">
                <span>
                  <img src={Clock} alt="clock" className="clock" />
                  &nbsp; Estimated Time: Under 5 minutes
                </span>
              </div>
              <div className="leftContentDescription">
                <span>
                  This step helps us understand your current skill levels across
                  core IT and soft skill areas. You’ll answer a set of
                  multiple-choice questions designed to assess your abilities
                  in:
                </span>
              </div>
              <div className="subDescription">
                <span>Don’t want to take the test?</span>
              </div>
              <div className="buttonText">
                <span>
                  We can also analyze your uploaded CV to assess your skills
                  automatically.
                </span>
              </div>
              <div className="skillBtnSesion">
                <div className="useSkillButton">
                  <span>Use Skills from CV</span>
                </div>
                <div className="testStartButton">
                  <span onClick={clickStartButton}>Start Skills test</span>
                </div>
              </div>
            </div>
          </div>
          <div className="skillAssestmentContentRight">
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
                <div class="step-label" style={{ color: "#9B9BA0" }}>
                  Interest Identification
                </div>
              </div>
              <div class="step active">
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
