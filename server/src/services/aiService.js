const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateResumeData = async (userDescription) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

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
    
    Ensure the data is realistic and well-formatted.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
};
