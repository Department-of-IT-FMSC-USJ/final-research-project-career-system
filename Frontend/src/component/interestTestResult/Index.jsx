import React from "react";
import ResultImage from "../../assets/images/traitResult.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const resultData = location.state?.results || [];
  const personalityresultData = location.state?.personalityresults || [];
  const cvResultData = location.state?.responseData || [];

  const data = [
    {
      trait: "Realistic (Doers)",
      description:
        "Hands-on work suits you best. Great for cybersecurity, network engineering, or IT support roles.",
    },
    {
      trait: "Investigative (Thinkers)",
      description:
        "You enjoy analysis and research. Ideal for data science, AI, or technical consulting roles.",
    },
    {
      trait: "Artistic (Creators)",
      description:
        "Design isn’t your top interest, but you may enjoy roles that involve some creative support.",
    },
    {
      trait: "Social (Helpers)",
      description:
        "Helping others motivates you. Great fit for IT support, training, or customer success roles.",
    },
    {
      trait: "Enterprising (Persuaders)",
      description:
        "Business-oriented tasks are less appealing, but you may thrive in guided leadership or startup projects.",
    },
    {
      trait: "Conventional (Organizers)",
      description:
        "Structured, rule-based work is not a strong preference, but basic documentation roles may still suit you.",
    },
  ].map((traitItem) => {
    const match = resultData.find((res) => res.trait === traitItem.trait);
    return {
      ...traitItem,
      score: match ? match.score : 0,
    };
  });

  const scoreBodyTemplate = (rowData) => {
    return (
      <div className="score-container">
        <span className="score-text">{rowData.score}%</span>
      </div>
    );
  };

  const traitBodyTemplate = (rowData) => {
    return <span className="trait-name">{rowData.trait}</span>;
  };

  const descriptionBodyTemplate = (rowData) => {
    return <span className="description-text">{rowData.description}</span>;
  };

  const clickInterest = () => {
    navigate("/skill-assestment", {
      state: {
        personalityresults: personalityresultData,
        interestResult: resultData,
        responseData: cvResultData,
      },
    });
  };

  const clickPrevious = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="interestTestResultContainer">
        <div className="interestTestResultContent">
          <div className="interestTestResultContentLeft">
            <div className="leftContent">
              <div className="ResultImage">
                <img
                  src={ResultImage}
                  alt="resultImage"
                  className="resultImage"
                />
              </div>
              <div className="leftContentTitle">
                <span>Your Work Interests Are Identified!</span>
              </div>
              <div className="resultLeftContentSubTitle">
                <span>You completed the Interest Identification Test.</span>
              </div>
              <div className="resultLeftContentDescription">
                <span>
                  Here's a summary of your top work interests based on the
                  RIASEC model, along with suggested IT career paths where
                  you're likely to thrive.
                </span>
              </div>
              <div className="personality-table-container">
                <DataTable
                  value={data}
                  stripedRows
                  className="personality-traits-table"
                  responsiveLayout="scroll"
                >
                  <Column
                    field="trait"
                    header="Interest Area"
                    body={traitBodyTemplate}
                    style={{ width: "20%" }}
                  />
                  <Column
                    field="score"
                    header="Score"
                    body={scoreBodyTemplate}
                    style={{ width: "25%" }}
                  />
                  <Column
                    field="description"
                    header="Description"
                    body={descriptionBodyTemplate}
                    style={{ width: "55%" }}
                  />
                </DataTable>
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
                <span onClick={clickInterest}>Skill Assetments &gt;</span>
              </div>
            </div>
          </div>
          <div className="interestTestResultContentRight">
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
                  Skills Test
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
