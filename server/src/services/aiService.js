const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateResumeData = async (userDescription) => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_google_gemini_api_key_here') {
    throw new Error('Missing Gemini API Key. Please add a valid key to server/.env');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
    let text = response.text();

    if (text.includes('```')) {
      text = text.replace(/```json\n?/, '').replace(/```\n?/, '').replace(/\n?```/, '');
    }

    const data = JSON.parse(text.trim());

    // Basic validation
    const required = ['personalInformation', 'summary', 'skills', 'experience', 'education'];
    const missing = required.filter(s => !data[s]);
    if (missing.length > 0) throw new Error(`Missing sections: ${missing.join(', ')}`);

    // Schema Migration: Ensure socialLinks is always a populated array if data exists
    const socialLinks = Array.isArray(data.socialLinks) ? data.socialLinks : [];
    
    // Migration for AI hallucinations of flat keys
    const info = data.personalInformation || {};
    if (info.linkedin && !socialLinks.find(l => l.label === 'LinkedIn')) socialLinks.push({ label: 'LinkedIn', url: info.linkedin });
    if (info.github && !socialLinks.find(l => l.label === 'GitHub')) socialLinks.push({ label: 'GitHub', url: info.github });
    if (info.portfolio && !socialLinks.find(l => l.label === 'Portfolio')) socialLinks.push({ label: 'Portfolio', url: info.portfolio });
    
    data.socialLinks = socialLinks;

    // Ensure all optional sections are initialized
    const optional = ['projects', 'certifications', 'achievements', 'positionsOfResponsibility', 'socialLinks'];
    optional.forEach(s => { if (!data[s]) data[s] = []; });

    return data;
  } catch (error) {
    // Handle Gemini API Quota / Rate Limit errors
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      const quotaError = new Error('AI generation is temporarily busy due to high demand (free-tier quota reached). Please try again in a minute.');
      quotaError.status = 429;
      throw quotaError;
    }

    if (error.message?.includes('API key not valid')) {
      const authError = new Error('Invalid Gemini API Key configuration.');
      authError.status = 401;
      throw authError;
    }

    console.error("Internal Gemini Error:", error);
    throw new Error('The AI service encountered an unexpected issue. Please retry shortly.');
  }
};
