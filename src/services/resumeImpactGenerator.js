import { performanceTracker } from "../utils/performanceTracker";

export const generateSystemImpactBullets = (resumeCount = 1) => {
  const metrics = performanceTracker.getAverageMetrics();
  
  return [
    `Architected a production-grade Resume Builder handling ${resumeCount}+ user-generated profiles with MongoDB persistence.`,
    `Optimized React rendering lifecycle to achieve ${metrics.smoothnessScore} interactions (Avg latency: ${metrics.avgInputLatency}ms).`,
    `Implemented a keyword-based ATS scoring algorithm to improve resume-job alignment by quantifying data match density.`
  ];
};
