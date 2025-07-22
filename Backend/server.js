const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const cors = require("cors");
require("dotenv").config();
const csv = require("csv-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//upload personalized qestionnaire
app.get("/api/questions", (req, res) => {
  const results = [];
  fs.createReadStream("personality_test_questions.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push({
        id: parseInt(data.id),
        text: data.text,
        trait: data.trait,
        description: data.description,
      });
    })
    .on("end", () => {
      res.json(results);
    })
    .on("error", () => {
      res.status(500).json({ error: "Could not read file" });
    });
});

//upload personalized questionnaire
app.get("/api/intrestquestions", (req, res) => {
  const results = [];
  fs.createReadStream("intrestsquestions.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push({
        id: parseInt(data.id),
        text: data.text,
        trait: data.trait,
        description: data.description,
      });
    })
    .on("end", () => {
      res.json(results);
    })
    .on("error", () => {
      res.status(500).json({ error: "Could not read file" });
    });
});

//upload skill assessment questionnaire
app.get("/api/skillquestions", (req, res) => {
  const results = [];
  fs.createReadStream("skill_test_questions.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push({
        id: parseInt(data.id),
        text: data.text,
        trait: data.trait,
        description: data.description,
      });
    })
    .on("end", () => {
      res.json(results);
    })
    .on("error", () => {
      res.status(500).json({ error: "Could not read file" });
    });
});
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|txt/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX, and TXT files are allowed"));
    }
  },
});

// Function to extract text from different file types
async function extractTextFromFile(filePath, mimetype) {
  try {
    if (mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } else if (
      mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimetype === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else if (mimetype === "text/plain") {
      return fs.readFileSync(filePath, "utf8");
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    throw new Error(`Error extracting text: ${error.message}`);
  }
}

// Function to parse CV using ChatGPT
async function parseCVWithChatGPT(cvText) {
  const prompt = `You are an intelligent assistant that helps identify relevant skills, experiences, and education from a user's CV to match them with suitable career paths.
The user has uploaded their CV. Your task is to extract the following key data from it and return the results in structured JSON format:
Extract and return the following fields:
	•	full_name: Full name of the applicant
	•	education: A list of education records with degree, field, institute, and year
	•	experience: A list of past experiences with job_title, company, duration, and responsibilities
	•	skills: A list of technical and soft skills
	•	certifications: Any certifications mentioned
	•	projects: Key projects with title and brief description
	•	languages: Languages known

CV Content:
${cvText}

Please return only a valid JSON object with the extracted information.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that extracts information from CVs and returns structured JSON data.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const extractedData = response.choices[0].message.content;

    // Try to parse the JSON response
    try {
      return JSON.parse(extractedData);
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from the response
      const jsonMatch = extractedData.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("Could not parse JSON from ChatGPT response");
    }
  } catch (error) {
    throw new Error(`ChatGPT API error: ${error.message}`);
  }
}

async function getCareerRecommendations(
  cv_data,
  personality_results,
  work_interest_results,
  skill_results
) {
  console.log(
    personality_results,
    work_interest_results,
    skill_results,
    cv_data
  );
  const prompt = `You are an AI-powered career advisor that provides smart, personalized job role recommendations for students in the IT industry. Analyze the student’s profile using the three assessment types and recommend suitable early-career job roles in IT.

DO NOT use past job experience, education, or job titles. Use only:
Consider the following job roles:
Frontend Developer  
Backend Developer  
Full Stack Developer  
Software Engineer  
Mobile App Developer  
Data Analyst  
Data Engineer  
Machine Learning Engineer  
AI Engineer  
QA Engineer  
Automation Tester  
Cybersecurity Analyst  
DevOps Engineer  
Cloud Engineer  
Network Engineer  
Business Analyst  
Product Manager  
Project Manager  
IT Support Specialist  
System Administrator  
UI/UX Researcher  
Content Designer  
SEO/Digital Marketer  
Technical Writer  
ERP Consultant  
CRM Consultant  
SAP Consultant  
IT Business Consultant  
Business Intelligence Analyst  
Database Administrator  
Scrum Master  
Technical Support Engineer  
IT Auditor  
Technical Consultant

1. CV Summary:
${cv_data}

2. Personality Traits (Big Five Model):
${personality_results}

3. Work Interest Assessment (RIASEC Model):
${work_interest_results}

4. Skill Assessment Results (0–100%):
${skill_results}

Use the following format to return the recommendations:
when the recommendations give priority to the top 3 job roles based on the student’s skills, personality traits, and work interests. Provide a brief explanation of why each role is a good fit, including:


📦 Output Format (Return valid JSON only):
use CV Skills Also to Recommend Jobs
{
  "top3jobs": [
    {
      "Job_Title": "...",
      "Match_Score": ...
    },
    ...
  ],
  "why_this_role_is_a_great_fit": "100–150 word personalized paragraph for the top job",
  "cv_refinement_tips": [
    "...", "...", "...", "...", "..."
  ],
  "who_is_a_": "Brief explanation of who this professional is and who this job suits",
  "duties_and_responsibilities": [
    "...", "...", "...", "...", "..."
  ],
  "where_do_i_start": "Beginner-friendly advice to start a career in this role"
}

⚠ Do not return anything outside this JSON. No markdown or commentary.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are an AI career advisor helping students identify the best career path based on their background and assessment results",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 3000,
      // temperature: 0.5,
    });

    const extractedData = response.choices[0].message.content;

    // Try to parse the JSON response
    try {
      return JSON.parse(extractedData);
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from the response
      const jsonMatch = extractedData.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("Could not parse JSON from ChatGPT response");
    }
  } catch (error) {
    throw new Error(`ChatGPT API error: ${error.message}`);
  }
}

// API Routes

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "CV Parser API is running" });
});

// Upload and parse CV endpoint
app.post("/api/parse-cv", upload.single("cv"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;
    const mimetype = req.file.mimetype;

    // Extract text from uploaded file
    const cvText = await extractTextFromFile(filePath, mimetype);

    if (!cvText || cvText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from the uploaded file",
      });
    }

    // Parse CV using ChatGPT
    const parsedData = await parseCVWithChatGPT(cvText);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: "CV parsed successfully",
      data: parsedData,
    });
  } catch (error) {
    // Clean up uploaded file in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error("Error parsing CV:", error);
    res.status(500).json({
      success: false,
      message: "Error parsing CV",
      error: error.message,
    });
  }
});

app.post("/api/recommendations", async (req, res) => {
  try {
    console.log("Received request for recommendations:", req.body);
    const {
      cv_data,
      personality_results,
      work_interest_results,
      skill_results,
    } = req.body;

    // Validate input
    if (
      !cv_data ||
      !personality_results ||
      !work_interest_results ||
      !skill_results
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Generate job recommendations based on the provided data
    const recommendations = await getCareerRecommendations(
      cv_data,
      personality_results,
      work_interest_results,
      skill_results
    );
    console.log("Generated Recommendations:", recommendations);

    res.json({
      success: true,
      message: "Job recommendations generated successfully",
      data: recommendations,
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({
      success: false,
      message: "Error generating recommendations",
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB",
      });
    }
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`CV Parser API is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Parse CV endpoint: POST http://localhost:${PORT}/api/parse-cv`);
  console.log(
    `Get Recommendations endpoint: POST http://localhost:${PORT}/api/recommendations`
  );
});

module.exports = app;
