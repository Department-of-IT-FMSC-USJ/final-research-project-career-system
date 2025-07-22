import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { RadioButton } from "primereact/radiobutton";
import Tips from "../../assets/images/bulbe.png"; // Replace path as needed
import "./style.css";

export default function PersonalityTest() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const options = [
    { value: "01", label: "Strongly Disagree", color: "#2563eb", score: "0" },
    { value: "02", label: "Disagree", color: "#6b7280", score: "1" },
    { value: "03", label: "Neutral", color: "#6b7280", score: "2" },
    { value: "04", label: "Agree", color: "#6b7280", score: "3" },
    { value: "05", label: "Strongly agree", color: "#6b7280", score: "5" },
  ];

  useEffect(() => {
    fetch("http://localhost:3500/api/questions")
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
    if (!selectedOption) return; // prevent going forward without selection

    const selectedOptionObj = options.find(
      (opt) => opt.value === selectedOption
    );
    const updatedAnswers = {
      ...answers,
      [questions[currentQuestion].id]: {
        score: selectedOptionObj.value,
        trait: questions[currentQuestion].trait,
      },
    };

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      const traitScores = {};
      Object.values(answers).forEach(({ score, trait }) => {
        traitScores[trait] = (traitScores[trait] || 0) + Number(score);
      });

      // calculate percentage assuming max 15 points per trait (adjust if needed)

      const finalResults = Object.entries(traitScores).map(([trait, score]) => {
        const percentage = (score / 15) * 100;
        return {
          trait,
          score: Math.round(percentage),
        };
      });

      navigate("/personality-traits-result", {
        state: { results: finalResults },
      });
    }
  };

  if (questions.length === 0) return <div>Loading questions...</div>;

  const currentQuestionData = questions[currentQuestion];

  return (
    <div>
      <div className="personalityTraitsQuestionContainer">
        <div className="personalityTraitsQuestionContenet">
          <div className="personalityTraitsQuestionContenetLeft">
            <div className="personalityTraitsQuestionContenetLeftBoxOne">
              <div className="personalityTraitsQuestionContenetLeftTitle">
                <span>Discover Your Personality Traits</span>
              </div>
              <div className="tipsText">
                <span>
                  <img src={Tips} alt="tips" className="tips" />
                  &nbsp;&nbsp;Trait : {currentQuestionData?.trait || "N/A"}
                </span>
              </div>
              <div className="tipsDescription">
                <span>{currentQuestionData?.description || ""}</span>
              </div>
            </div>

            <div className="questionIdentify">
              <div className="questionCount">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
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
                      {currentQuestionData?.id}. {currentQuestionData?.text}
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
                          inputId={option.value.toString()}
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

              <div
                className={`nextQuestionButton ${
                  !selectedOption ? "disabled" : ""
                }`}
                onClick={handleNextQuestion}
              >
                <span>
                  {currentQuestion === questions.length - 1
                    ? "Finish Test"
                    : "Next Question"}{" "}
                  &gt;
                </span>
              </div>
            </div>
          </div>

          <div className="personalityTraitsQuestionContenetRight">
            <div className="stepper-container">
              <div className="step active">
                <div className="step-number">1</div>
                <div className="step-label">
                  <strong style={{ color: "#9B9BA0" }}>Upload CV</strong>
                </div>
              </div>
              <div className="step active">
                <div className="step-number">2</div>
                <div className="step-label">Personality Test</div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-label">Interest Identification</div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-label">Skill Identification</div>
              </div>
              <div className="step">
                <div className="step-number">5</div>
                <div className="step-label">Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
