export const calculateATSScore = (resumeData, jobDescription) => {
  if (!jobDescription || !resumeData) return { score: 0, matchingKeywords: [], missingKeywords: [] };

  const resumeText = JSON.stringify(resumeData).toLowerCase();
  
  // Extract words from Job Description, filtering out common stop words and small words
  const rawKeywords = jobDescription.toLowerCase().match(/\b(\w+)\b/g) || [];
  
  // Filter for meaningful technical/domain keywords (simple heuristic: > 4 chars)
  const technicalKeywords = [...new Set(rawKeywords)].filter(word => word.length > 4);
  
  if (technicalKeywords.length === 0) return { score: 100, matchingKeywords: [], missingKeywords: [] };

  const matches = technicalKeywords.filter(kw => resumeText.includes(kw));
  const score = (matches.length / technicalKeywords.length) * 100;

  return {
    score: Math.round(score),
    matchingKeywords: matches,
    missingKeywords: technicalKeywords.filter(kw => !matches.includes(kw)).slice(0, 8)
  };
};
