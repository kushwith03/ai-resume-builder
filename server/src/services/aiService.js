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
        "location": "string",
        "linkedin": "string",
        "gitHub": "string"
      },
      "summary": "string (professional summary)",
      "skills": [{"category": "string (e.g. Programming Languages)", "skills": "string (comma separated list, e.g. Java, JavaScript, SQL)"}],
      "experience": [{"jobTitle": "string", "company": "string", "duration": "string", "responsibility": "string"}],
      "education": [{"degree": "string", "university": "string", "location": "string", "graduationYear": "string"}],
      "projects": [{"title": "string", "description": "string", "technologiesUsed": "string"}]
    }

    STRICT GUIDELINES FOR MISSING INFORMATION:
    If personal details are not explicitly provided in the user description, use these placeholders EXACTLY:
    - fullName: "Your Name"
    - email: "your.email@example.com"
    - phoneNumber: "+1-555-000-0000"
    - location: "City, Country"
    - linkedin: "linkedin.com/in/yourprofile"
    - gitHub: "github.com/yourusername"
    
    FOR SKILLS:
    Group technical skills into meaningful categories (e.g. Frameworks, Cloud, Databases). Each category should have a list of skills as a single comma-separated string.

    Do NOT hallucinate or invent fake identities (e.g., Alex Chen). Only use real data from the description or the placeholders above.
    
    Ensure the data is professional and well-formatted. Return ONLY the raw JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    if (text.includes('```')) {
      text = text.replace(/```json\n?/, '').replace(/```\n?/, '').replace(/\n?```/, '');
    }

    const data = JSON.parse(text.trim());

    const requiredSections = ['personalInformation', 'summary', 'skills', 'experience', 'education', 'projects'];
    const missingSections = requiredSections.filter(section => !data[section]);

    if (missingSections.length > 0) {
      throw new Error(`AI generated an incomplete resume. Missing: ${missingSections.join(', ')}`);
    }

    return data;
  } catch (error) {
    if (error.message?.includes('API key not valid')) {
      throw new Error('Invalid Gemini API Key. Please check your .env file.');
    }
    throw error;
  }
};
