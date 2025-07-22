import React from "react";
import { InputText } from "primereact/inputtext";
import DontHaveCvImage from "../../assets/images/noCv.png";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Index() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Handle the continue button click
    // You can add logic here to save the input data or navigate to another page
    navigate("/personality-trait"); // Replace with your desired route
  };

  return (
    <div>
      <div className="dontHaveCvContainer">
        <div className="dontHaveCvTitle">
          <span>Extracted Details form your CV</span>
        </div>
        <div className="dontHaveCvContent">
          <div className="dontHaveCvContentLeft">
            <div className="dontHaveCvInputSection">
              <div>
                <div className="dontHaveCvInputName">
                  <span>What's your name?</span>
                </div>
                <div className="dontHaveCvInputField">
                  <InputText className="dontHaveCvInput" />
                </div>
              </div>
              <br />
              <div>
                <div className="dontHaveCvInputName">
                  <span>What's your degree programme?</span>
                  <br />
                  <span className="subInputName">
                    (e.g., Software Engineering, Information Systems, Computer
                    Science)
                  </span>
                </div>
                <div className="dontHaveCvInputField">
                  <InputText className="dontHaveCvInput" />
                </div>
              </div>
              <br />
              <div>
                <div className="dontHaveCvInputName">
                  <span>What technical skills do you have?</span>
                  <br />
                  <span className="subInputName">
                    (e.g., Python, JavaScript, SQL)
                  </span>
                </div>
                <div className="dontHaveCvInputField">
                  <InputText className="dontHaveCvInput" />
                </div>
              </div>
              <br />
              <div>
                <div className="dontHaveCvInputName">
                  <span>Do you have any previous experience?</span>
                  <br />
                  <span className="subInputName">
                    (e.g., academic projects, internships, freelance work, none)
                  </span>
                </div>
                <div className="dontHaveCvInputField">
                  <InputText className="dontHaveCvInput" />
                </div>
              </div>
              <div className="dontHaveCvContinueButton">
                <span onClick={handleContinue}>Continue</span>
              </div>
            </div>
          </div>
          <div className="dontHaveCvContentRight">
            <img
              src={DontHaveCvImage}
              alt="No CV"
              className="dontHaveCvImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
