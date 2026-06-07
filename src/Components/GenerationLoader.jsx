import React, { useState, useEffect } from 'react';
import { FaMagic } from 'react-icons/fa';

const stages = [
  "Analyzing career details...",
  "Understanding experience...",
  "Building resume structure...",
  "Optimizing ATS keywords...",
  "Generating sections...",
  "Finalizing resume..."
];

const GenerationLoader = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setCurrentStage(0);
      return;
    }

    let interval;
    const startTime = Date.now();

    const updateProgress = () => {
      setProgress(prev => {
        if (prev >= 95) return 95;

        let increment = 0;
        if (prev < 40) {
          increment = Math.random() * 15; // Fast
        } else if (prev < 80) {
          increment = Math.random() * 3; // Slow
        } else {
          increment = Math.random() * 0.5; // Very slow
        }

        const nextProgress = prev + increment;
        
        // Update stage based on progress
        const stageIndex = Math.min(
          Math.floor((nextProgress / 100) * stages.length),
          stages.length - 1
        );
        setCurrentStage(stageIndex);

        return nextProgress > 95 ? 95 : nextProgress;
      });
    };

    interval = setInterval(updateProgress, 400);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-base-300/80 backdrop-blur-xl animate-fadeIn">
      <div className="max-w-md w-full px-6 text-center space-y-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse"></div>
          <div className="relative bg-base-200 p-6 rounded-full shadow-2xl border border-white/5">
            <FaMagic className="text-4xl text-primary animate-bounce" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white tracking-tight">Architecting your Future</h2>
          <p className="text-slate-400 font-medium h-6">{stages[currentStage]}</p>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
            <span>Processing</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" 
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationLoader;
