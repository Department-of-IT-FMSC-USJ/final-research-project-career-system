import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tips from "../../assets/images/bulbe.png";
import { ProgressBar } from "primereact/progressbar";
import { RadioButton } from "primereact/radiobutton";
import "./style.css";

export default function Index() {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [progressValue, setProgressValue] = useState(0);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const personalityresultData = location.state?.personalityresults || [];
  const interestresultData = location.state?.interestResult || [];
  const cvResultData = location.state?.responseData || [];
  const options = [
    { value: "01", label: "No Experience", color: "#2563eb", score: "0" },
    { value: "02", label: "Beginner", color: "#6b7280", score: "1" },
    { value: "03", label: "Intermediate", color: "#6b7280", score: "2" },
    { value: "04", label: "Advanced", color: "#6b7280", score: "3" },
    { value: "05", label: "Expert", color: "#6b7280", score: "5" },
  ];
  useEffect(() => {
    fetch("http://localhost:3500/api/skillquestions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setProgressValue(((currentQuestion + 1) / questions.length) * 100);
    }
  }, [currentQuestion, questions]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleNextQuestion = () => {
    if (!selectedOption || !questions[currentQuestion]) return;

    const selectedOptionObj = options.find(
      (opt) => opt.value === selectedOption
    );

    const updatedAnswers = {
      ...answers,
      [questions[currentQuestion].id]: {
        score: Number(selectedOptionObj.score),
        trait: questions[currentQuestion].trait,
      },
    };

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      const traitScores = {};
      Object.values(updatedAnswers).forEach(({ score, trait }) => {
        traitScores[trait] = (traitScores[trait] || 0) + score;
      });

      const finalResults = Object.entries(traitScores).map(
        ([trait, score]) => ({
          trait,
          score: Math.round((score / 15) * 100),
        })
      );

      navigate("/skill-assesstment-result", {
        state: {
          results: finalResults,
          personalityresults: personalityresultData,
          interestResult: interestresultData,
          responseData: cvResultData,
        },
      });
    }
  };

  const currentQuestionData = questions[currentQuestion];

  if (!currentQuestionData) return null;
  return (
    <div>
      <div className="skillAssessmentQuestionContainer">
        <div className="skillAssessmentQuestionContent">
          <div className="skillAssessmentQuestionContentLeft">
            <div className="personalityTraitsQuestionContenetLeftBoxOne">
              <div className="personalityTraitsQuestionContenetLeftTitle">
                <span>Assess Your Skills</span>
              </div>
              <div className="tipsText">
                <span>
                  <img src={Tips} alt="tips" className="tips" />
                  &nbsp;&nbsp;Skill Area : {currentQuestionData.trait}
                </span>
              </div>
              <div className="tipsDescription">
                <span>{currentQuestionData.description}</span>
              </div>
            </div>
            <div className="questionIdentify">
              <div className="questionCount">
                <span>
                  Questions {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="progressBar">
                <ProgressBar
                  value={progressValue}
                  showValue={false}
                  className="progressBarStyle"
                />
              </div>

              <div className="survey-container">
                <div className="question-header">
                  <div className="question-text">
                    <span>
                      {currentQuestionData.id}. {currentQuestionData.text}
                    </span>
                  </div>
                </div>

                <div className="options-container">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={`option-item ${
                        selectedOption === option.value ? "selected" : ""
                      }`}
                      onClick={() => handleOptionChange(option.value)}
                    >
                      <div className="option-number">{option.value}</div>
                      <div className="option-label">{option.label}</div>
                      <div className="radio-button-wrapper">
                        <RadioButton
                          inputId={option.value}
                          name="survey"
                          value={option.value}
                          onChange={(e) => handleOptionChange(e.value)}
                          checked={selectedOption === option.value}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="nextQuestionButton" onClick={handleNextQuestion}>
                <span>
                  {currentQuestion === questions.length - 1
                    ? "Finish Test"
                    : "Next Question"}{" "}
                  &gt;
                </span>
              </div>
            </div>
          </div>
          <div className="skillAssessmentQuestionContentRight">
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
