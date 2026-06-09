const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const PRIMARY_MODEL = "gemini-3.5-flash";
const FALLBACK_MODEL = "gemini-3.1-flash-lite";

/**
 * Checks if an error is a temporary service failure that should be retried.
 */
const isRetryableError = (error) => {
  const status = error.status || (error.response ? error.response.status : null);
  // Retry on 429 (Rate Limit) and 5xx (Server Errors)
  return status === 429 || (status >= 500 && status <= 504);
};

/**
 * Core function to call Gemini API and handle raw output
 */
const callGemini = async (modelName, prompt) => {
  console.log(`[AI-LOG] Using model: ${modelName}`);
  const model = genAI.getGenerativeModel({ model: modelName });
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  const startIdx = text.indexOf('{');
  const endIdx = text.lastIndexOf('}');
  
  if (startIdx === -1 || endIdx === -1) {
    throw new Error("AI response did not contain a valid JSON object");
  }

  return JSON.parse(text.substring(startIdx, endIdx + 1));
};

exports.generateResumeData = async (userDescription) => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_google_gemini_api_key_here') {
    console.error("[AI-ERROR] Missing Gemini API Key");
    throw new Error("AI service configuration error.");
  }

  const prompt = `
  You are an expert resume writer. Generate a professional resume in JSON format based on the following user description: "${userDescription}".

  The JSON structure MUST follow this exactly:
  {
    "personalInformation": {
      "fullName": "string",
      "email": "string",
      "phoneNumber": "string",
      "location": "string"
    },
    "socialLinks": [{"label": "string (e.g. LinkedIn, GitHub, Portfolio)", "url": "string"}],
    "summary": "string (professional summary)",
    "skills": [{"category": "string (e.g. Programming Languages)", "skills": "string (comma separated list)"}],
    "experience": [{"jobTitle": "string", "company": "string", "duration": "string", "responsibility": "string (multiple lines if needed)"}],
    "education": [{"degree": "string", "university": "string", "location": "string", "graduationYear": "string", "academicScore": "string (optional, e.g. CGPA, GPA, Percentage)"}],
    "projects": [{"title": "string", "description": "string", "technologiesUsed": "string", "githubUrl": "string (optional URL)", "liveUrl": "string (optional URL)"}],
    "certifications": [{"title": "string", "issuer": "string", "date": "string"}],
    "achievements": [{"award": "string", "organization": "string", "date": "string"}],
    "positionsOfResponsibility": [{"title": "string", "organization": "string", "duration": "string", "description": "string"}]
  }

  STRICT GUIDELINES:
  1. Personal details placeholders (if missing): fullName: "Your Name", email: "your.email@example.com", phoneNumber: "+1-555-000-0000", location: "City, Country".
  2. SOCIAL LINKS: Extract LinkedIn, GitHub, or Portfolio URLs if present.
  3. EXPERIENCE/PROJECTS: Use multiple lines for responsibilities and descriptions to ensure depth.
  4. MISSING SECTIONS: If the description doesn't mention projects, certifications, or achievements, return empty arrays [] for those specific fields. Do NOT invent fake data for these sections.
  5. Only return raw JSON. No markdown formatting.
  `;

  let lastError = null;

  // 1. Primary Model Attempts (Max 3)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      if (attempt > 1) {
        const delay = attempt === 2 ? 2000 : 4000;
        console.log(`[AI-LOG] Retry attempt ${attempt} for ${PRIMARY_MODEL} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const data = await callGemini(PRIMARY_MODEL, prompt);
      return processResumeData(data);

    } catch (error) {
      lastError = error;
      console.error(`[AI-LOG] Attempt ${attempt} failed for ${PRIMARY_MODEL}: ${error.message}`);
      
      if (!isRetryableError(error)) {
        break; // Stop retrying if error is not temporary (e.g., auth, safety)
      }
    }
  }

  // 2. Fallback Model Attempt (If primary failed with retryable errors)
  if (lastError && isRetryableError(lastError)) {
    console.warn(`[AI-LOG] Fallback activation: Switching to ${FALLBACK_MODEL}`);
    try {
      const data = await callGemini(FALLBACK_MODEL, prompt);
      return processResumeData(data);
    } catch (fallbackError) {
      console.error(`[AI-LOG] Final failure for ${FALLBACK_MODEL}: ${fallbackError.message}`);
      lastError = fallbackError;
    }
  }

  // 3. Final Error Handling
  console.error(`[AI-ERROR] Final failure reason: ${lastError.message}`);
  const finalError = new Error("AI service is currently busy. Please try again in a few moments.");
  finalError.status = lastError.status || 503;
  throw finalError;
};

/**
 * Utility to post-process and validate AI generated data
 */
function processResumeData(data) {
  const required = ['personalInformation', 'summary', 'skills', 'experience', 'education'];
  const missing = required.filter(s => !data[s]);
  if (missing.length > 0) {
    throw new Error(`AI generated data is missing required sections: ${missing.join(', ')}`);
  }

  const socialLinks = Array.isArray(data.socialLinks) ? data.socialLinks : [];
  const info = data.personalInformation || {};
  
  // Backwards compatibility for legacy model output formats
  if (info.linkedin && !socialLinks.find(l => l.label === 'LinkedIn')) socialLinks.push({ label: 'LinkedIn', url: info.linkedin });
  if (info.github && !socialLinks.find(l => l.label === 'GitHub')) socialLinks.push({ label: 'GitHub', url: info.github });
  if (info.portfolio && !socialLinks.find(l => l.label === 'Portfolio')) socialLinks.push({ label: 'Portfolio', url: info.portfolio });
  
  data.socialLinks = socialLinks;

  const optional = ['projects', 'certifications', 'achievements', 'positionsOfResponsibility'];
  optional.forEach(s => { if (!data[s]) data[s] = []; });

  return data;
}
