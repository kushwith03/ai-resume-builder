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
      "skills": [{"title": "string", "level": "string"}],
      "experience": [{"jobTitle": "string", "company": "string", "duration": "string", "responsibility": "string"}],
      "education": [{"degree": "string", "university": "string", "location": "string", "graduationYear": "string"}],
      "projects": [{"title": "string", "description": "string", "technologiesUsed": "string"}]
    }
    
    Ensure the data is realistic and well-formatted. Do not include any markdown formatting or backticks in your response, return ONLY the raw JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Strip markdown formatting if AI hallucinates code blocks
    if (text.includes('```')) {
      text = text.replace(/```json\n?/, '').replace(/```\n?/, '').replace(/\n?```/, '');
    }

    const data = JSON.parse(text.trim());

    // Basic schema validation
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
