import React, { useEffect, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DownloadImage from "../../assets/images/download.png";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import config from "../../config/index";
import "./style.css";

export default function Index() {
  const location = useLocation();
  const [responseData, setResponseData] = useState("");
  const hasFetched = useRef(false);

  const personalityresultData = location.state?.personalityresults || [];
  const interestresultData = location.state?.interestResult || [];
  const skillresultData = location.state?.skillresult || [];
  const cvResultData = location.state?.responseData || [];
  const [isLoading, setIsLoading] = useState(true);
  const [topJobRes, setTopJobRes] = useState([]);
  const [cvRefinementTip, setCvRefinementTip] = useState("");
  const [whyThisRoleIsAGreatFitRes, setWhyThisRoleIsAGreatFitRes] =
    useState("");
  const [whoisa, setWhoisa] = useState("");
  const [dutiesAndResponsibilities, setDutiesAndResponsibilities] =
    useState("");
  const [whereDoIStart, setWhereDoIStart] = useState("");

  const sendRecommendationsData = async () => {
    try {
      setIsLoading(true);

      // Prepare personality results
      const personalityData = {};
      personalityresultData.forEach((item) => {
        const key = item.trait.toLowerCase().replace(/\s+/g, "");
        personalityData[key] = `${item.score}%`;
      });

      // Prepare work interest results
      const workInterestData = {};
      interestresultData.forEach((item) => {
        const traitMap = {
          "Realistic (Doers)": "realistic",
          "Investigative (Thinkers)": "investigative",
          "Artistic (Creators)": "artistic",
          "Social (Helpers)": "social",
          "Enterprising (Persuaders)": "enterprising",
          "Conventional (Organizers)": "conventional",
        };
        const key = traitMap[item.trait];
        if (key) {
          workInterestData[key] = `${item.score}%`;
        }
      });

      // Prepare skill results
      const skillData = {};
      skillresultData.forEach((item) => {
        const skillMap = {
          Programming: "frontend_development",
          "Web Development": "frontend_development",
          "UI/UX Design": "ui_ux_design",
          "Data Analysis": "data_analysis",
          "Communication Skills": "communication_skills",
          "Teamwork & Collaboration": "teamwork",
          "Software Testing": "attention_to_detail",
          Cybersecurity: "problem_solving",
        };
        const key = skillMap[item.trait];
        if (key) {
          skillData[key] = `${item.score}%`;
        }
      });

      // Add defaults to ensure all keys are present
      const defaultSkillData = {
        frontend_development: skillData.frontend_development || "0%",
        ui_ux_design: skillData.ui_ux_design || "0%",
        backend_development: skillData.backend_development || "0%",
        data_analysis: skillData.data_analysis || "0%",
        communication_skills: skillData.communication_skills || "0%",
        teamwork: skillData.teamwork || "0%",
        attention_to_detail: skillData.attention_to_detail || "0%",
        problem_solving: skillData.problem_solving || "0%",
      };

      // Prepare full payload
      const payload = {
        cv_data: {
          full_name: cvResultData?.full_name || "User",
          education: cvResultData?.education || [],
          experience: cvResultData?.experience || [],
          skills: cvResultData?.skills || [],
          certifications: cvResultData?.certifications || [],
          projects: cvResultData?.projects || [],
          languages: cvResultData?.languages || [],
        },
        personality_results: personalityData,
        work_interest_results: workInterestData,
        skill_results: defaultSkillData,
      };

      // Fetch backend API
      const response = await fetch(`${config.API_URL}/api/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Handle API response
      if (response.ok) {
        const result = await response.json();
        setResponseData(result.data);
        setTopJobRes(result.data.top3jobs || []);
        setCvRefinementTip(result.data.cv_refinement_tips || "");
        setWhyThisRoleIsAGreatFitRes(
          result.data.why_this_role_is_a_great_fit || ""
        );
        setWhoisa(result.data.who_is_a_ || "");
        setDutiesAndResponsibilities(
          result.data.duties_and_responsibilities || ""
        );
        setWhereDoIStart(result.data.where_do_i_start || "");
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error sending data to recommendations API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      !hasFetched.current &&
      (personalityresultData.length > 0 ||
        interestresultData.length > 0 ||
        skillresultData.length > 0)
    ) {
      sendRecommendationsData();
      hasFetched.current = true;
    }
  }, [
    personalityresultData,
    interestresultData,
    skillresultData,
    cvResultData,
  ]);

  const dataTableOne = [
    {
      trait: "Openness",
      description:
        "You are highly creative and open to new ideas and tech tools. Ideal for UI/UX, AI research, innovation roles.",
    },
    {
      trait: "Conscientiousness",
      description:
        "You are detail-oriented and disciplined. Great fit for QA, DevOps, Project Mgmt.",
    },
    {
      trait: "Extraversion",
      description:
        "You prefer quieter environments. Perfect for backend dev, data roles.",
    },
    {
      trait: "Agreeableness",
      description:
        "You work well in teams. Fit for support, teaching, PM, and HR in tech.",
    },
    {
      trait: "Neuroticism",
      description:
        "You stay calm under pressure — strong asset for stressful dev and testing roles.",
    },
  ].map((traitItem) => {
    const match = personalityresultData.find(
      (res) => res.trait === traitItem.trait
    );
    return {
      ...traitItem,
      score: match ? match.score : 0,
    };
  });

  const dataTableTwo = [
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
    const match = interestresultData.find(
      (res) => res.trait === traitItem.trait
    );
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

    const matchedResult = skillresultData.find(
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

  const getTopJob = () => {
    console.log("Top Job Recommendations:", topJobRes);

    if (Array.isArray(topJobRes) && topJobRes.length > 0) {
      return topJobRes[0];
    }

    return { jobTitle: "UI/UX Designer", matchScore: 90 };
  };

  const getOtherJobs = () => {
    if (Array.isArray(topJobRes) && topJobRes.length > 1) {
      return topJobRes.slice(1, 3);
    }
    return [
      { jobTitle: "Product Designer", matchScore: 45 },
      { jobTitle: "Graphic Designer", matchScore: 76 },
    ];
  };

  const getCvRefinementTips = () => {
    if (cvRefinementTip && typeof cvRefinementTip === "object") {
      const tipsArray = Object.values(cvRefinementTip);
      if (tipsArray.length > 0) return tipsArray;
    }
    return [
      "Highlight any design-related coursework, certifications, or self-learning.",
      "Include freelance or personal design projects — even mock projects show initiative.",
      "Tailor your CV to show your problem-solving mindset and creativity.",
      "Use action verbs like designed, created, collaborated, and improved.",
    ];
  };
  const getDutiesAndResponsibilities = () => {
    if (
      topJob?.Job_Title &&
      dutiesAndResponsibilities &&
      typeof dutiesAndResponsibilities === "object"
    ) {
      const duties = dutiesAndResponsibilities[topJob.Job_Title];

      if (Array.isArray(duties) && duties.length > 0) {
        return duties;
      }
    }

    // Fallback content if no match found
    return [
      "Designing and implementing software solutions based on user requirements",
      "Testing and debugging software applications to ensure functionality and performance",
      "Collaborating with team members to develop efficient and scalable software systems",
      "Updating and maintaining existing software applications to meet evolving needs",
    ];
  };

  const topJob = getTopJob();
  const otherJobs = getOtherJobs();

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    const colors = {
      primary: "#2563eb",
      secondary: "#7c3aed",
      accent: "#059669",
      text: "#1f2937",
      lightText: "#6b7280",
      background: "#f8fafc",
      white: "#ffffff",
    };

    const addColoredRect = (x, y, width, height, color) => {
      doc.setFillColor(color);
      doc.rect(x, y, width, height, "F");
    };

    const addWrappedText = (
      text,
      x,
      y,
      maxWidth,
      fontSize = 12,
      color = colors.text
    ) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(color);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + lines.length * (fontSize * 0.5);
    };

    const checkNewPage = (currentY, requiredSpace = 30) => {
      if (currentY + requiredSpace > pageHeight - 30) {
        doc.addPage();
        addHeader();
        return 40;
      }
      return currentY;
    };

    const addHeader = () => {
      addColoredRect(0, 0, pageWidth, 25, colors.primary);

      doc.setFontSize(10);
      doc.setTextColor(colors.white);
      doc.setFont(undefined, "bold");
      doc.text("Career Assessment Report", margin, 15);

      doc.text(new Date().toLocaleDateString(), pageWidth - margin - 30, 15);
    };

    const addDecorativeElement = (
      x,
      y,
      width = 40,
      height = 2,
      color = colors.accent
    ) => {
      addColoredRect(x, y, width, height, color);
    };

    addHeader();
    yPosition = 50;

    addColoredRect(
      margin - 5,
      yPosition - 5,
      contentWidth + 10,
      35,
      colors.background
    );

    doc.setFontSize(28);
    doc.setFont(undefined, "bold");
    doc.setTextColor(colors.primary);
    doc.text("Career Assessment Report", margin, yPosition + 15);

    addDecorativeElement(margin, yPosition + 20, 80, 3, colors.secondary);
    yPosition += 50;

    yPosition = checkNewPage(yPosition, 80);

    addColoredRect(
      margin - 5,
      yPosition - 10,
      contentWidth + 10,
      50,
      colors.background
    );
    addColoredRect(margin - 5, yPosition - 10, 5, 50, colors.accent);

    doc.setFontSize(20);
    doc.setFont(undefined, "bold");
    doc.setTextColor(colors.primary);
    doc.text("Top Match", margin + 5, yPosition + 5);

    doc.setFontSize(24);
    doc.setTextColor(colors.text);
    doc.text(topJob.Job_Title, margin + 5, yPosition + 20);

    addColoredRect(pageWidth - 60, yPosition - 5, 35, 20, colors.accent);
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.setTextColor(colors.white);
    doc.text(`${topJob.Match_Score}%`, pageWidth - 50, yPosition + 8);

    yPosition += 55;

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(colors.text);
    doc.text("Other Strong Matches:", margin, yPosition);
    yPosition += 15;

    otherJobs.forEach((match) => {
      doc.setFontSize(12);
      doc.setTextColor(colors.text);
      doc.text(`${match.Job_Title}`, margin, yPosition);

      addColoredRect(margin + 80, yPosition - 5, 80, 8, "#e5e7eb");

      const fillWidth = (match.Match_Score / 100) * 80;
      addColoredRect(
        margin + 80,
        yPosition - 5,
        fillWidth,
        8,
        colors.secondary
      );

      doc.setFontSize(10);
      doc.setTextColor(colors.lightText);
      doc.text(`${match.Match_Score}%`, margin + 170, yPosition);

      yPosition += 15;
    });

    yPosition += 20;

    yPosition = checkNewPage(yPosition, 80);

    addDecorativeElement(margin, yPosition, 60, 3, colors.primary);
    yPosition += 10;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.setTextColor(colors.primary);
    doc.text("Why This Role is Perfect for You", margin, yPosition);
    yPosition += 15;

    const fitDescription =
      whyThisRoleIsAGreatFitRes ||
      "You've shown a strong openness to creativity, innovation, and trying out new ideas. These are essential qualities for your recommended role. Your personality reflects a strong desire to learn and adapt, making you a great match for this field.";

    const descriptionHeight = 60;
    addColoredRect(
      margin - 5,
      yPosition - 5,
      contentWidth + 10,
      descriptionHeight,
      colors.background
    );

    doc.setFontSize(11);
    doc.setTextColor(colors.text);
    yPosition = addWrappedText(
      fitDescription,
      margin + 5,
      yPosition + 5,
      contentWidth - 10,
      11
    );
    yPosition += 20;

    yPosition = checkNewPage(yPosition, 120);

    addDecorativeElement(margin, yPosition, 50, 3, colors.accent);
    yPosition += 10;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.setTextColor(colors.primary);
    doc.text("Top 3 Skills", margin, yPosition);
    yPosition += 20;

    const topSkills = skillScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((skill) => ({
        name: skill.name,
        score: skill.score,
        description: `You excel in ${skill.name.toLowerCase()}, which is critical for your recommended role.`,
      }));

    topSkills.forEach((skill, index) => {
      yPosition = checkNewPage(yPosition, 35);

      addColoredRect(
        margin - 5,
        yPosition - 5,
        contentWidth + 10,
        30,
        colors.background
      );
      addColoredRect(margin - 5, yPosition - 5, 3, 30, colors.secondary);

      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.setTextColor(colors.text);
      doc.text(skill.name, margin + 5, yPosition + 8);

      addColoredRect(pageWidth - 50, yPosition, 25, 12, colors.accent);
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.setTextColor(colors.white);
      doc.text(`${skill.score}%`, pageWidth - 42, yPosition + 8);

      doc.setFontSize(10);
      doc.setTextColor(colors.lightText);
      yPosition = addWrappedText(
        skill.description,
        margin + 5,
        yPosition + 15,
        contentWidth - 10,
        10
      );
      yPosition += 15;
    });

    yPosition = checkNewPage(yPosition, 100);

    addDecorativeElement(margin, yPosition, 70, 3, colors.primary);
    yPosition += 10;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.setTextColor(colors.primary);
    doc.text("Personality Profile (Big Five)", margin, yPosition);
    yPosition += 20;

    if (dataTableOne && dataTableOne.length > 0) {
      dataTableOne.forEach((trait, index) => {
        yPosition = checkNewPage(yPosition, 25);

        const bgColor = index % 2 === 0 ? colors.background : colors.white;
        addColoredRect(
          margin - 5,
          yPosition - 5,
          contentWidth + 10,
          20,
          bgColor
        );

        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.setTextColor(colors.text);
        doc.text(`${trait.trait}`, margin, yPosition + 5);

        addColoredRect(margin + 80, yPosition, 60, 6, "#e5e7eb");
        const fillWidth = (trait.score / 100) * 60;
        addColoredRect(margin + 80, yPosition, fillWidth, 6, colors.primary);

        doc.setFontSize(10);
        doc.setTextColor(colors.lightText);
        doc.text(`${trait.score}%`, margin + 150, yPosition + 4);

        yPosition = addWrappedText(
          trait.description,
          margin,
          yPosition + 12,
          contentWidth - 10,
          9,
          colors.lightText
        );
        yPosition += 5;
      });
    }

    yPosition = checkNewPage(yPosition, 100);

    addDecorativeElement(margin, yPosition, 80, 3, colors.secondary);
    yPosition += 10;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.setTextColor(colors.primary);
    doc.text("Work Interest Profile (RIASEC)", margin, yPosition);
    yPosition += 20;

    if (dataTableTwo && dataTableTwo.length > 0) {
      dataTableTwo.forEach((trait, index) => {
        yPosition = checkNewPage(yPosition, 25);

        const bgColor = index % 2 === 0 ? colors.background : colors.white;
        addColoredRect(
          margin - 5,
          yPosition - 5,
          contentWidth + 10,
          20,
          bgColor
        );

        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.setTextColor(colors.text);
        doc.text(`${trait.trait}`, margin, yPosition + 5);

        addColoredRect(margin + 80, yPosition, 60, 6, "#e5e7eb");
        const fillWidth = (trait.score / 100) * 60;
        addColoredRect(margin + 80, yPosition, fillWidth, 6, colors.secondary);

        doc.setFontSize(10);
        doc.setTextColor(colors.lightText);
        doc.text(`${trait.score}%`, margin + 150, yPosition + 4);

        yPosition = addWrappedText(
          trait.description,
          margin,
          yPosition + 12,
          contentWidth - 10,
          9,
          colors.lightText
        );
        yPosition += 5;
      });
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      addColoredRect(0, pageHeight - 25, pageWidth, 25, colors.primary);

      doc.setFontSize(8);
      doc.setTextColor(colors.white);
      doc.setFont(undefined, "normal");
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 10);
      doc.text(
        "Career Assessment Report - Generated on " +
          new Date().toLocaleDateString(),
        margin,
        pageHeight - 10
      );
    }

    const timestamp = new Date().toISOString().split("T")[0];
    doc.save(`Career_Assessment_Report_${timestamp}.pdf`);
  };

  if (isLoading) {
    return (
      <div
        className="loading-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background:
            "radial-gradient(circle at 30% 20%, #0F65FF 0%, #093D99 50%, #EDF5FD 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                background: "rgba(255, 255, 255, 0.7)",
                borderRadius: "50%",
                left: `${(index + 1) * 10}%`,
                animation: `float ${6 + (index % 3)}s linear infinite`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          <div
            style={{
              width: "140px",
              height: "140px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "3px solid transparent",
              borderTop: "3px solid rgba(255, 255, 255, 0.9)",
              borderRight: "3px solid rgba(255, 255, 255, 0.3)",
              animation: "spin 2s linear infinite",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
            }}
          />

          <div
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTop: "2px solid #0F65FF",
              borderLeft: "2px solid #093D99",
              animation: "spin 1.5s linear infinite reverse",
              filter: "drop-shadow(0 0 8px #EDF5FD)",
            }}
          />

          <div
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTop: "2px solid #0F65FF",
              borderBottom: "2px solid #093D99",
              animation: "spin 1s linear infinite",
              filter: "drop-shadow(0 0 6px #EDF5FD)",
            }}
          />

          <div
            style={{
              width: "30px",
              height: "30px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, #ffffff 0%, #0F65FF 70%, transparent 100%)",
              borderRadius: "50%",
              animation: "corePulse 2s ease-in-out infinite",
              boxShadow: `
              0 0 20px #EDF5FD,
              0 0 40px #0F65FF,
              0 0 60px #093D99
            `,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  width: "8px",
                  height: "8px",
                  background: "#ffffff",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                  top: "-80px",
                  left: "-4px",
                  animation: "orbit 3s linear infinite",
                  animationDelay: `${index}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "60px",
          }}
        >
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              style={{
                width: "10px",
                height: "10px",
                background: "linear-gradient(45deg, #ffffff, #EDF5FD)",
                borderRadius: "50%",
                animation: "bounce 1.4s ease-in-out infinite",
                animationDelay: `${index * 0.2}s`,
                boxShadow: "0 0 8px #0F65FF",
              }}
            />
          ))}
        </div>

        <div
          style={{
            color: "#ffffff",
            fontFamily: "'Arial', sans-serif",
            fontSize: "28px",
            fontWeight: 300,
            marginTop: "30px",
            textShadow: `
            0 0 10px rgba(255, 255, 255, 0.5),
            0 2px 4px rgba(0, 0, 0, 0.3)
          `,
            animation: "textGlow 3s ease-in-out infinite",
            letterSpacing: "2px",
          }}
        >
          Analyzing Your Data
        </div>

        <div
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "'Arial', sans-serif",
            fontSize: "16px",
            fontWeight: 200,
            marginTop: "10px",
            animation: "fadeInOut 2s ease-in-out infinite",
          }}
        >
          Please wait while we process your information
        </div>

        <div
          style={{
            width: "300px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "2px",
            marginTop: "40px",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #0F65FF, #093D99, #EDF5FD)",
              borderRadius: "2px",
              animation: "progressFill 4s ease-in-out infinite",
              boxShadow: "0 0 10px #0F65FF",
            }}
          />
        </div>
        <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) rotate(360deg); 
            opacity: 0; 
          }
        }

        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes corePulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.3); 
            opacity: 0.8; 
          }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }

        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-15px) scale(1.1); 
            opacity: 1; 
          }
        }

        @keyframes textGlow {
          0%, 100% { 
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 0.5),
              0 2px 4px rgba(0, 0, 0, 0.3); 
          }
          50% { 
            text-shadow: 
              0 0 20px rgba(255, 255, 255, 0.8),
              0 0 30px #0F65FF,
              0 2px 4px rgba(0, 0, 0, 0.3); 
          }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes progressFill {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        @media (max-width: 768px) {
          .loading-container div:nth-of-type(3) {
            font-size: 24px !important;
          }
        }
      `}</style>
      </div>
    );
  }
  return (
    <div>
      <div className="mainResultContiner">
        {isLoading ? (
          <div className="topSectionLoading">
            <p>Loading your job recommendations...</p>
          </div>
        ) : (
          <div className="topSection">
            <div className="resultLeftPane">
              <div className="progressBar-result">
                <CircularProgressbar
                  value={topJob.Match_Score}
                  text={`${topJob.Match_Score}%`}
                  strokeWidth={10}
                  styles={buildStyles({
                    textColor: "#070707",
                    trailColor: "#C9E4FF",
                    pathColor: "#0F65FF",
                  })}
                />
              </div>
            </div>

            <div className="resultMiddlePane">
              <div className="resultMiddlePaneTitle">
                <span>Top match</span>
              </div>
              <div className="resultMiddlePaneSubTitle">
                <span>{topJob.Job_Title}</span>
              </div>

              <div className="resultMiddlePaneScoreSection">
                {Array.isArray(otherJobs) &&
                  otherJobs.map((job, index) => (
                    <span
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="middleProgressBar">
                        <CircularProgressbar
                          value={job.Match_Score}
                          strokeWidth={10}
                          text={`${job.Match_Score}%`}
                          styles={buildStyles({
                            textColor: "#FFFFFF",
                            trailColor: "#E2E2E24D",
                            pathColor: "#FFFFFF",
                            textSize: "25px",
                          })}
                        />
                      </div>
                      &nbsp; <span>{job.Job_Title}</span>
                    </span>
                  ))}
              </div>
            </div>

            <div className="resultRightPane">
              <div className="downloadLink">
                <span onClick={handleDownloadReport}>Download Your Report</span>
                &nbsp;&nbsp;
                <img
                  src={DownloadImage}
                  alt="download"
                  className="downloadImage"
                />
                &nbsp;
              </div>
            </div>
          </div>
        )}

        <hr className="hrTag" style={{ marginLeft: "3%", marginRight: "3%" }} />
        <div className="mainResultContent">
          <div className="mainResultContentLeft">
            <div className="firstBox">
              <div className="firstBoxTitle">
                <span>Why This Role is a Great Fit for You</span>
              </div>
              <div className="firstBoxDescription">
                <span>
                  {whyThisRoleIsAGreatFitRes ||
                    "You've shown a strong openness to creativity, innovation, and trying out new ideas. These are essential qualities for your recommended role. Your personality reflects a strong desire to learn and adapt, making you a great match for this field."}
                </span>
              </div>
            </div>
            <div className="dataTableOne">
              <div className="dataTableOneTitle">
                <span>Personality Profile (Big Five)</span>
              </div>
              <div className="personality-table-container">
                <DataTable
                  value={dataTableOne}
                  stripedRows
                  className="personality-traits-table"
                  responsiveLayout="scroll"
                >
                  <Column
                    field="trait"
                    header="Trait"
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
            </div>
            <div className="dataTableOne">
              <div className="dataTableOneTitle">
                <span>Work Interest Profile (RIASEC)</span>
              </div>
              <div className="personality-table-container">
                <DataTable
                  value={dataTableTwo}
                  stripedRows
                  className="personality-traits-table"
                  responsiveLayout="scroll"
                >
                  <Column
                    field="trait"
                    header="Trait"
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
            </div>
            <div className="scoreContainer">
              {skillScores
                .reduce((rows, item, index) => {
                  if (index % 2 === 0) rows.push([]);
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
          </div>
          <div className="mainResultContentRight">
            <div className="mainResultContentRightBox">
              <div className="mainResultContentRightBoxTitle">
                <span>Who is a {topJob.Job_Title}?</span>
              </div>
              <div className="mainResultContentRightBoxDescription">
                <span>{whoisa}</span>
              </div>
              <div className="reponsibilityTitle">
                <span>Duties & Responsibilities</span>
              </div>
              <div className="reponsibilitySubTile">
                <span>
                  As a {topJob.Job_Title}, you may be responsible for:
                </span>
              </div>
              <div className="reponsibilityList">
                <ul>
                  {getDutiesAndResponsibilities().map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
              <div className="startText">
                <span>Where Do I Start?</span>
              </div>
              <div className="startTextSub">
                <span>{whereDoIStart}</span>
              </div>
            </div>

            <div className="cvRefinementText">
              <span>CV Refinement Tips to Reach This Goal</span>
            </div>
            <div className="mainResultContentRightBox">
              <div className="reponsibilityList">
                <ul>
                  {getCvRefinementTips().map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="needMore">
              <span>Need more guidance?</span>
            </div>
            <div className="needMoreSubText">
              <span>
                If you have questions or want to discuss your results further,
                talk directly to our career advisors.
              </span>
            </div>
            <div className="contactDetails">
              <span>
                Mr. Nuwan Rathnayake
                <br />
                <span className="telNumber">076 456 7890</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
