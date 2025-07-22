import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/index";
import { Toast } from "primereact/toast";
import "./style.css";

export default function Index() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setCvFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clickDontHaveCv = () => {
    navigate("/dont-have-cv");
  };

  const handleContinue = async () => {
    try {
      setLoading(true);

      if (!cvFile) {
        toast.current?.show({
          severity: "warn",
          summary: "File Required",
          detail: "Please select a CV file before continuing",
          life: 5000,
        });
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("cv", cvFile);

      const response = await fetch(`${config.API_URL}/api/parse-cv`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload CV");
      }

      const responseData = await response.json();
      const cvData = responseData.data;
      setLoading(false);
      navigate("/personality-trait", {
        state: { responseData: cvData },
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Upload Error",
        detail: error.message,
        life: 5000,
      });
      console.error("Error uploading CV:", error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="uploadCVContainer">
        <div className="uploadCvLeft">
          <div className="uploadCvSestion">
            <div className="uploadCvHeader">
              <span>
                Upload your resume here and find which one is the right fit for
                you{" "}
              </span>
            </div>
            <div className="uploadInput" onClick={triggerFileInput}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="uploadInputText">
                <span>
                  <span className="uploadText" onChange={handleFileChange}>
                    Upload
                  </span>{" "}
                  or Drop your CV here
                </span>
              </div>
              <div className="formatType">
                <span>PDF/Docx only</span>
              </div>
            </div>
            <div className="fileName">
              <span>{fileName || "File name appear here"}</span>
            </div>
            <div className="continueButton">
              <span onClick={handleContinue}>
                {" "}
                {loading ? "Uploading..." : "Continue"}
              </span>
            </div>
            <div className="dontHaveCv">
              <span>
                <span className="dontHaveCvText" onClick={clickDontHaveCv}>
                  Don't have a CV?
                </span>
                No problem!
              </span>
            </div>
          </div>
        </div>
        <div className="uploadCvRight">
          <div class="stepper-container">
            <div class="step active">
              <div class="step-number">1</div>
              <div class="step-label">
                <strong>Upload CV</strong>
              </div>
            </div>
            <div class="step">
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
  );
}
