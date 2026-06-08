export const renderText = (text, fallback = "") => {
  if (!text || String(text).trim() === "") return fallback;
  return String(text);
};
