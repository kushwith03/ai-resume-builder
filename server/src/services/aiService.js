const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateResumeData = async (userDescription) => {
  console.log("[AI-DEBUG] Starting generation for user description");
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_google_gemini_api_key_here') {
    throw new Error('Missing Gemini API Key in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

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
    "education": [{"degree": "string", "university": "string", "location": "string", "graduationYear": "string"}],
    "projects": [{"title": "string", "description": "string", "technologiesUsed": "string"}],
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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("[AI-DEBUG] Raw model output received");

    // Extract JSON using first "{" and last "}"
    const startIdx = text.indexOf('{');
    const endIdx = text.lastIndexOf('}');
    
    if (startIdx === -1 || endIdx === -1) {
      console.error("[AI-DEBUG] Parse failure: No JSON object found in response");
      throw new Error("AI response did not contain a valid JSON object");
    }

    const jsonString = text.substring(startIdx, endIdx + 1);
    console.log("[AI-DEBUG] Attempting to parse JSON");
    const data = JSON.parse(jsonString);
    console.log("[AI-DEBUG] Parse successful");

    // Strict validation
    const required = ['personalInformation', 'summary', 'skills', 'experience', 'education'];
    const missing = required.filter(s => !data[s]);
    if (missing.length > 0) {
      throw new Error(`AI generated data is missing required sections: ${missing.join(', ')}`);
    }

    // Migration logic for social links
    const socialLinks = Array.isArray(data.socialLinks) ? data.socialLinks : [];
    const info = data.personalInformation || {};
    if (info.linkedin && !socialLinks.find(l => l.label === 'LinkedIn')) socialLinks.push({ label: 'LinkedIn', url: info.linkedin });
    if (info.github && !socialLinks.find(l => l.label === 'GitHub')) socialLinks.push({ label: 'GitHub', url: info.github });
    if (info.portfolio && !socialLinks.find(l => l.label === 'Portfolio')) socialLinks.push({ label: 'Portfolio', url: info.portfolio });
    data.socialLinks = socialLinks;

    // Ensure all optional sections are initialized as arrays
    const optional = ['projects', 'certifications', 'achievements', 'positionsOfResponsibility'];
    optional.forEach(s => { if (!data[s]) data[s] = []; });

    console.log("[AI-DEBUG] Returning processed data");
    return data;
  } catch (error) {
    console.error("[AI-DEBUG] Exception caught:", error.message);
    
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      const quotaError = new Error('AI quota reached. Please try again in a minute.');
      quotaError.status = 429;
      throw quotaError;
    }

    if (error.message?.includes('API key not valid')) {
      const authError = new Error('Invalid Gemini API Key configuration.');
      authError.status = 401;
      throw authError;
    }

    // Unmask the error message
    throw new Error(`AI Service Error: ${error.message}`);
  }
};
