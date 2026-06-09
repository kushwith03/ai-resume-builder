export const formatUrl = (url) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
};

export const normalizeUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  let cleanedUrl = url.trim();
  
  // Extract URL from markdown [text](link)
  const mdMatch = cleanedUrl.match(/\[.*?\]\((.*?)\)/);
  if (mdMatch) {
    cleanedUrl = mdMatch[1].trim();
  }
  
  if (!/^https?:\/\//i.test(cleanedUrl)) {
    cleanedUrl = `https://${cleanedUrl}`;
  }
  
  try {
    new URL(cleanedUrl);
    return cleanedUrl;
  } catch (e) {
    return null;
  }
};

export const getInferredLabel = (url, customLabel) => {
  if (customLabel && customLabel.trim()) return customLabel;
  if (!url) return "Link";
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('linkedin.com')) return 'LinkedIn';
  if (lowerUrl.includes('github.com')) return 'GitHub';
  if (lowerUrl.includes('portfolio') || lowerUrl.includes('personal') || lowerUrl.includes('website')) return 'Portfolio';
  return 'Link';
};
