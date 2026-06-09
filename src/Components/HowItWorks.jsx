import React from 'react';
import { FaMagic, FaEdit, FaChartLine, FaFilePdf, FaChevronRight } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-black tracking-widest text-[10px] uppercase mb-4 block">Transformation Pipeline</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">From raw notes to professional PDF.</h2>
          <p className="text-slate-400 text-lg">Our AI-driven workflow handles the complexity so you can focus on your story.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 relative">
          {/* Start Element: Messy Input */}
          <div className="flex flex-col items-center gap-4 mb-8 lg:mb-0 animate-pulse shrink-0">
            <div className="w-20 h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-lg flex flex-col p-2.5 gap-2 rotate-[-6deg] opacity-40">
              <div className="h-1 w-full bg-slate-600 rounded-full"></div>
              <div className="h-1 w-4/5 bg-slate-600 rounded-full"></div>
              <div className="h-1 w-5/6 bg-slate-600 rounded-full"></div>
              <div className="mt-auto h-1 w-2/3 bg-slate-700 rounded-full"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Messy Input</span>
          </div>

          <div className="hidden lg:block text-primary/20 shrink-0"><FaChevronRight className="text-xl" /></div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 flex-1 w-full">
            {/* Step 1 */}
            <div className="p-7 rounded-2xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300 flex flex-col items-start min-h-[140px]">
              <div className="w-8 h-8 bg-base-300 border border-white/10 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-lg mb-5 group-hover:bg-primary transition-colors">01</div>
              <div className="flex items-center gap-3 mb-4">
                <FaEdit className="text-slate-500 group-hover:text-primary transition-colors text-lg" />
                <h3 className="text-lg font-bold text-white">Describe</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Paste your raw notes or old resume text.</p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-2xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300 flex flex-col items-start min-h-[140px]">
              <div className="w-8 h-8 bg-base-300 border border-white/10 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-lg mb-5 group-hover:bg-primary transition-colors">02</div>
              <div className="flex items-center gap-3 mb-4">
                <FaMagic className="text-slate-500 group-hover:text-primary transition-colors text-lg" />
                <h3 className="text-lg font-bold text-white">Generate</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">AI structures and polishes the content.</p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-2xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300 flex flex-col items-start min-h-[140px]">
              <div className="w-8 h-8 bg-base-300 border border-white/10 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-lg mb-5 group-hover:bg-primary transition-colors">03</div>
              <div className="flex items-center gap-3 mb-4">
                <FaChartLine className="text-slate-500 group-hover:text-primary transition-colors text-lg" />
                <h3 className="text-lg font-bold text-white">Optimize</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Match keywords for ATS scoring.</p>
            </div>

            {/* Step 4 */}
            <div className="p-7 rounded-2xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300 flex flex-col items-start min-h-[140px]">
              <div className="w-8 h-8 bg-base-300 border border-white/10 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-lg mb-5 group-hover:bg-primary transition-colors">04</div>
              <div className="flex items-center gap-3 mb-4">
                <FaFilePdf className="text-slate-500 group-hover:text-primary transition-colors text-lg" />
                <h3 className="text-lg font-bold text-white">Export</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Download a professional PDF.</p>
            </div>
          </div>

          <div className="hidden lg:block text-primary/20 shrink-0"><FaChevronRight className="text-xl" /></div>

          {/* End Element: Polished Output */}
          <div className="flex flex-col items-center gap-4 mt-8 lg:mt-0 group shrink-0">
            <div className="w-20 h-24 bg-white border border-white shadow-[0_0_40px_rgba(255,255,255,0.15)] rounded-lg flex flex-col p-2.5 gap-2 transform group-hover:scale-110 transition-transform">
              <div className="h-2 w-1/2 bg-slate-900 rounded-full mx-auto mb-1"></div>
              <div className="h-1 w-full bg-slate-200 rounded-full"></div>
              <div className="h-1 w-full bg-slate-200 rounded-full"></div>
              <div className="h-1 w-full bg-slate-200 rounded-full"></div>
              <div className="h-1 w-4/5 bg-slate-200 rounded-full"></div>
              <div className="mt-auto flex justify-between">
                <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                <div className="w-4 h-4 rounded-full bg-primary/20"></div>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Professional PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
