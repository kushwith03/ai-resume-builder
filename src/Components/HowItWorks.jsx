import React from 'react';

const HowItWorks = () => {
  return (
    <div className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-black tracking-widest text-[10px] uppercase mb-4 block">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Transform your career story in four simple steps.</h2>
          <p className="text-slate-400 text-lg">From raw notes to an ATS-optimized professional PDF in minutes, not hours.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -z-10 -translate-y-1/2"></div>
          
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-base-300 border border-white/10 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/20">01</div>
            <h3 className="text-lg font-bold text-white mb-3 mt-2">Describe Yourself</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Paste your career notes, old resume content, or a brief profile description.</p>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-base-300 border border-white/10 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/20">02</div>
            <h3 className="text-lg font-bold text-white mb-3 mt-2">AI Generation</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Gemini AI transforms your raw information into structured professional content.</p>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-base-300 border border-white/10 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/20">03</div>
            <h3 className="text-lg font-bold text-white mb-3 mt-2">Edit & Optimize</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Refine your sections and match keywords to target a specific job description.</p>
          </div>

          {/* Step 4 */}
          <div className="p-8 rounded-3xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-base-300 border border-white/10 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/20">04</div>
            <h3 className="text-lg font-bold text-white mb-3 mt-2">Download PDF</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Export a beautifully formatted, ATS-friendly professional PDF document.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
