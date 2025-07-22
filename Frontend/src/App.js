import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DataExtractionPage from "./pages/DataExtractionPage";
import DontHaveCvPage from "./pages/DontHaveCvPage";
import PersonalityTraitPage from "./pages/PersonalityTraitPage";
import PersonalityTraitsQuestionPage from "./pages/PersonalityTraitsQuestionPage";
import PersonalityTraitResultPage from "./pages/PersonalityTraitResultPage";
import InterestTestPage from "./pages/InterestTestPage";
import InterestTestQuestionPage from "./pages/InterestTestQuestionPage";
import InterestTestResultPage from "./pages/InterestTestResultPage";
import SkillAssesmentPage from "./pages/SkillAssesmentPage";
import SkillAssessmentQuestionPage from "./pages/SkillAssessmentQuestionPage";
import SkillAssessmentResultPage from "./pages/SkillAssessmentResultPage";
import ResultPage from "./pages/ResultPage";
import "./App.css";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/data-extraction" element={<DataExtractionPage />} />
          <Route path="/dont-have-cv" element={<DontHaveCvPage />} />
          <Route path="/personality-trait" element={<PersonalityTraitPage />} />
          <Route
            path="/personality-traits-question"
            element={<PersonalityTraitsQuestionPage />}
          />
          <Route
            path="/personality-traits-result"
            element={<PersonalityTraitResultPage />}
          />
          <Route path="/interest-test" element={<InterestTestPage />} />
          <Route
            path="/interest-test-question"
            element={<InterestTestQuestionPage />}
          />
          <Route
            path="/interest-test-result"
            element={<InterestTestResultPage />}
          />
          <Route path="/skill-assestment" element={<SkillAssesmentPage />} />
          <Route
            path="/skill-assesstment-question"
            element={<SkillAssessmentQuestionPage />}
          />
          <Route
            path="/skill-assesstment-result"
            element={<SkillAssessmentResultPage />}
          />
          <Route path="/result-page" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}
