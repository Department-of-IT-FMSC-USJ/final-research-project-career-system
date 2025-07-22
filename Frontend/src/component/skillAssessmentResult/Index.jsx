import React from "react";
import ResultImage from "../../assets/images/traitResult.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const personalityresultData = location.state?.personalityresults || [];
  const interestresultData = location.state?.interestResult || [];
  const resultData = location.state?.results || [];
  const cvResultData = location.state?.responseData || [];

  const clickWork = () => {
    navigate("/result-page", {
      state: {
        personalityresults: personalityresultData,
        interestResult: interestresultData,
        skillresult: resultData,
        responseData: cvResultData,
      },
    });
  };

  const getSkillScore = (traitName) => {
    const mapping = {
      Programming: "Programming",
      "Web Development": "Web Development",
      Cybersecurity: "Cybersecurity",
      "Software Testing": "Software Testing",
      "UI/UX Design": "UI/UX Design",
      "Data Analysis": "Data Analysis",
      "Team Collaboration": "Teamwork & Collaboration",
      Leadership: "Communication Skills",
    };

    const matchedResult = resultData.find(
      (item) => item.trait === mapping[traitName]
    );
    return matchedResult ? matchedResult.score : 0;
  };

  const skillScores = [
    { name: "Programming", score: getSkillScore("Programming") },
    { name: "Web Development", score: getSkillScore("Web Development") },
    { name: "Cybersecurity", score: getSkillScore("Cybersecurity") },
    { name: "Software Testing", score: getSkillScore("Software Testing") },
    { name: "UI/UX Design", score: getSkillScore("UI/UX Design") },
    { name: "Data Analysis", score: getSkillScore("Data Analysis") },
    { name: "Team Collaboration", score: getSkillScore("Team Collaboration") },
    { name: "Leadership", score: getSkillScore("Leadership") },
  ].map((skill, index, array) => ({
    ...skill,
    active: array
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .some((topSkill) => topSkill.name === skill.name),
  }));

  const clickPrevious = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="skillAssessmentResultContainer">
        <div className="skillAssessmentResultContent">
          <div className="skillAssessmentResultContentLeft">
            <div className="leftContent">
              <div className="ResultImage">
                <img
                  src={ResultImage}
                  alt="resultImage"
                  className="resultImage"
                />
              </div>
              <div className="leftContentTitle">
                <span>Your Skill Profile is Ready!</span>
              </div>
              <div className="resultLeftContentSubTitle">
                <span>You completed the Skill Assessment Test.</span>
              </div>
              <div className="resultLeftContentDescription">
                <span>
                  Here’s a summary of your self-rated skill levels across
                  technical and non-technical areas. This helps us understand
                  your strengths and recommend IT career paths that align with
                  your capabilities.
                </span>
              </div>
              <div className="scoreContainer">
                {skillScores
                  .reduce((rows, item, index) => {
                    if (index % 3 === 0) rows.push([]);
                    rows[rows.length - 1].push(item);
                    return rows;
                  }, [])
                  .map((row, idx) => (
                    <div key={idx}>
                      <div className="scoreContent">
                        {row.map((item, i) => (
                          <span
                            key={i}
                            className={item.active ? "activeScore" : ""}
                          >
                            {item.name} {item.score}%
                          </span>
                        ))}
                      </div>
                      <br />
                    </div>
                  ))}
              </div>

              <hr className="hrTag" />
              <div className="resultFooter">
                <div className="footerDescription">
                  <span>
                    Let’s continue with the next step to learn more about your
                    interests.
                  </span>
                </div>
                <div className="footerSubDescription">
                  <span>
                    Next, we’ll explore your interests to help you find roles
                    that align with your passions.
                  </span>
                </div>
              </div>
            </div>
            <div className="resultButtonSesction">
              <div className="previewButton">
                <span onClick={clickPrevious}>&lt; Previous</span>
              </div>
              <div className="interrestButton">
                <span onClick={clickWork}>Work Preferences &gt;</span>
              </div>
            </div>
          </div>
          <div className="skillAssessmentResultContentRight">
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
