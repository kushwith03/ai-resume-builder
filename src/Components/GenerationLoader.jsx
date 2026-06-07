import React, { useState, useEffect, useMemo } from 'react';
import { FaMagic, FaTimes, FaChartBar, FaCheckCircle, FaRocket } from 'react-icons/fa';

const MESSAGES = [
  "Understanding career information",
  "Identifying technical skills",
  "Organizing experience timeline",
  "Building ATS-friendly structure",
  "Optimizing section hierarchy",
  "Preparing professional formatting",
  "Generating resume sections",
  "Finalizing layout"
];

const ESTIMATES = [
  "Usually takes 10–20 seconds",
  "Almost there",
  "Finalizing output"
];

const SkeletonPreview = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden select-none px-8 py-12">
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-48 bg-white rounded-md animate-pulse"></div>
        <div className="flex gap-3">
          <div className="h-3 w-32 bg-white rounded-md animate-pulse"></div>
          <div className="h-3 w-32 bg-white rounded-md animate-pulse"></div>
        </div>
      </div>
      {/* Summary Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-white rounded-md animate-pulse"></div>
        <div className="space-y-1">
          <div className="h-2 w-full bg-white rounded-md animate-pulse"></div>
          <div className="h-2 w-full bg-white rounded-md animate-pulse"></div>
          <div className="h-2 w-3/4 bg-white rounded-md animate-pulse"></div>
        </div>
      </div>
      {/* Experience Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-28 bg-white rounded-md animate-pulse"></div>
        {[0, 1].map(i => (
          <div key={i} className="space-y-2 pl-4 border-l border-white/20">
            <div className="flex justify-between">
              <div className="h-3 w-32 bg-white rounded-md animate-pulse"></div>
              <div className="h-2 w-20 bg-white rounded-md animate-pulse"></div>
            </div>
            <div className="h-2 w-24 bg-white rounded-md animate-pulse"></div>
            <div className="space-y-1 pt-1">
              <div className="h-1.5 w-full bg-white rounded-md animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-1.5 w-5/6 bg-white rounded-md animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GenerationLoader = ({ isLoading, onCancel }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  
  const metrics = useMemo(() => ({
    sections: Math.min(10, Math.floor((progress / 95) * 10) + 1),
    skills: Math.floor((progress / 95) * 15) + 5,
    experience: Math.max(1, Math.floor((progress / 95) * 4))
  }), [progress]);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setMessageIndex(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95;
        let increment = 0;
        if (prev < 40) increment = 0.8 + Math.random() * 1.5;
        else if (prev < 80) increment = 0.2 + Math.random() * 0.5;
        else increment = 0.05 + Math.random() * 0.1;
        return Math.min(95, prev + increment);
      });
    }, 100);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const estimateText = progress < 60 ? ESTIMATES[0] : progress < 85 ? ESTIMATES[1] : ESTIMATES[2];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0a0a0c] overflow-hidden">
      <SkeletonPreview />
      
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-lg w-full px-8 flex flex-col items-center">
        {/* Core Loading Element */}
        <div className="relative mb-12">
          <div className="absolute -inset-12 bg-primary/10 blur-[80px] rounded-full animate-pulse"></div>
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-xl rounded-full"></div>
          <div className="relative w-24 h-24 bg-base-200 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <FaMagic className="text-4xl text-primary animate-bounce-subtle z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20">
              <div className="h-full bg-primary shadow-[0_0_10px_rgba(var(--p),0.5)] transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Textual Feedback */}
        <div className="text-center space-y-4 w-full">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Architecting Resume</h2>
            <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI Processing
            </div>
          </div>
          
          <div className="h-8 flex items-center justify-center">
            <p className="text-slate-300 font-medium text-sm animate-fadeIn" key={messageIndex}>
              {MESSAGES[messageIndex]}
            </p>
          </div>
        </div>

        {/* Progress & Metrics */}
        <div className="w-full mt-10 space-y-6">
          <div className="space-y-3">
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 bg-shimmer animate-shimmer"></div>
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out relative shadow-[0_0_15px_rgba(var(--p),0.3)]"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 right-0 h-full w-8 bg-white/20 blur-sm"></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest px-1">
              <span className="text-slate-500">{estimateText}</span>
              <span className="text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">{Math.floor(progress)}%</span>
            </div>
          </div>

          {/* Contextual Metrics Card */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md">
            <div className="text-center space-y-1">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tight">Sections</p>
              <p className="text-sm font-bold text-white tabular-nums">{metrics.sections}<span className="text-slate-600 font-medium">/10</span></p>
            </div>
            <div className="text-center space-y-1 border-x border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tight">Skills</p>
              <p className="text-sm font-bold text-white tabular-nums">{metrics.skills}</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tight">Experience</p>
              <p className="text-sm font-bold text-white tabular-nums">{metrics.experience}</p>
            </div>
          </div>
        </div>

        {/* Cancel Action */}
        {onCancel && (
          <button 
            onClick={onCancel}
            className="mt-12 btn btn-ghost btn-sm text-slate-500 hover:text-white group transition-all"
          >
            <FaTimes className="mr-2 text-xs group-hover:rotate-90 transition-transform" />
            Cancel Generation
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
        .bg-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(20px); }
          75% { transform: translateY(-30px) translateX(-10px); }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default GenerationLoader;
