import React from 'react';
import { FaMagic, FaEdit, FaChartLine, FaFilePdf, FaChevronRight } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="py-12 relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-primary font-black tracking-widest text-[10px] uppercase block">How It Works</span>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 relative">
          {/* Steps Pipeline */}
          <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-4 lg:gap-4 w-full">
            {/* Step 1 */}
            <div className="w-full sm:w-1/2 lg:flex-1 p-5 rounded-xl bg-base-100 border border-white/5 relative group hover:border-primary/20 transition-all duration-300 flex flex-col items-start min-h-[110px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-base-300 border border-white/10 text-white rounded-lg flex items-center justify-center font-black text-[10px] group-hover:bg-primary transition-colors shrink-0">01</div>
                <FaEdit className="text-slate-500 group-hover:text-primary transition-colors" />
                <h3 className="text-sm font-bold text-white whitespace-nowrap">Describe</h3>
              </div>
              <p className="text-[12px] text-slate-500 leading-snug">Paste your raw notes or old resume text.</p>
            </div>

            <div className="hidden lg:block text-primary/10 shrink-0 mx-1"><FaChevronRight className="text-xs" /></div>

            {/* Step 2 */}
            <div className="w-full sm:w-1/2 lg:flex-1 p-5 rounded-xl bg-base-100 border border-white/5 relative group hover:border-primary/20 transition-all duration-300 flex flex-col items-start min-h-[110px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-base-300 border border-white/10 text-white rounded-lg flex items-center justify-center font-black text-[10px] group-hover:bg-primary transition-colors shrink-0">02</div>
                <FaMagic className="text-slate-500 group-hover:text-primary transition-colors" />
                <h3 className="text-sm font-bold text-white whitespace-nowrap">Generate</h3>
              </div>
              <p className="text-[12px] text-slate-500 leading-snug">AI structures and polishes the content.</p>
            </div>

            <div className="hidden lg:block text-primary/10 shrink-0 mx-1"><FaChevronRight className="text-xs" /></div>

            {/* Step 3 */}
            <div className="w-full sm:w-1/2 lg:flex-1 p-5 rounded-xl bg-base-100 border border-white/5 relative group hover:border-primary/20 transition-all duration-300 flex flex-col items-start min-h-[110px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-base-300 border border-white/10 text-white rounded-lg flex items-center justify-center font-black text-[10px] group-hover:bg-primary transition-colors shrink-0">03</div>
                <FaChartLine className="text-slate-500 group-hover:text-primary transition-colors" />
                <h3 className="text-sm font-bold text-white whitespace-nowrap">Optimize</h3>
              </div>
              <p className="text-[12px] text-slate-500 leading-snug">Match keywords for ATS scoring.</p>
            </div>

            <div className="hidden lg:block text-primary/10 shrink-0 mx-1"><FaChevronRight className="text-xs" /></div>

            {/* Step 4 */}
            <div className="w-full sm:w-1/2 lg:flex-1 p-5 rounded-xl bg-base-100 border border-white/5 relative group hover:border-primary/20 transition-all duration-300 flex flex-col items-start min-h-[110px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-base-300 border border-white/10 text-white rounded-lg flex items-center justify-center font-black text-[10px] group-hover:bg-primary transition-colors shrink-0">04</div>
                <FaFilePdf className="text-slate-500 group-hover:text-primary transition-colors" />
                <h3 className="text-sm font-bold text-white whitespace-nowrap">Download</h3>
              </div>
              <p className="text-[12px] text-slate-500 leading-snug">Export a professional PDF document.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
