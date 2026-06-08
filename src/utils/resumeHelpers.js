export const formatUrl = (url) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
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
