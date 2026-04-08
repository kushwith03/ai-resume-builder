export const calculateATSScore = (resumeData, jobDescription) => {
  if (!jobDescription || !resumeData) return { score: 0, matchingKeywords: [], missingKeywords: [] };

  // Helper to extract text from nested data structure
  const extractText = (data) => {
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) return data.map(extractText).join(' ');
    if (typeof data === 'object' && data !== null) {
      return Object.values(data).map(extractText).join(' ');
    }
    return '';
  };

  const resumeText = extractText(resumeData).toLowerCase();
  
  // Extract words from Job Description, filtering out common stop words and small words
  const rawKeywords = jobDescription.toLowerCase().match(/\b(\w+)\b/g) || [];
  
  // Filter for meaningful technical/domain keywords (simple heuristic: > 4 chars)
  const technicalKeywords = [...new Set(rawKeywords)].filter(word => word.length > 4);
  
  // IF no valid keywords are found in JD, we return 0 match rather than false 100%
  if (technicalKeywords.length === 0) return { score: 0, matchingKeywords: [], missingKeywords: [] };

  const matches = technicalKeywords.filter(kw => resumeText.includes(kw));
  const score = (matches.length / technicalKeywords.length) * 100;

  return {
    score: Math.round(score),
    matchingKeywords: matches,
    missingKeywords: technicalKeywords.filter(kw => !matches.includes(kw)).slice(0, 8)
  };
};
