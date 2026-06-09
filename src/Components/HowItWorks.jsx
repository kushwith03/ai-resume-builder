import React from 'react';
import { FaMagic, FaEdit, FaChartLine, FaFilePdf, FaChevronRight } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-black tracking-widest text-[10px] uppercase mb-4 block">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Transform your career story in four simple steps.</h2>
          <p className="text-slate-400 text-lg">From raw notes to an ATS-optimized professional PDF in minutes, not hours.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative">
          {/* Connecting line for desktop with arrows */}
          <div className="hidden lg:flex absolute top-[45%] left-0 w-full justify-around items-center -z-10 px-12">
            <div className="flex-1 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 relative">
              <FaChevronRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-primary/40" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 relative">
              <FaChevronRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-primary/40" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 relative">
              <FaChevronRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-primary/40" />
            </div>
          </div>
          
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-base-300 border border-white/10 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/20 z-20">01</div>
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-500 group-hover:text-primary transition-colors">
              <FaEdit className="text-lg" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 mt-2">Describe Yourself</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Paste your career notes, old resume content, or a brief profile description.</p>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-base-300 border border-white/10 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/20 z-20">02</div>
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-500 group-hover:text-primary transition-colors">
              <FaMagic className="text-lg" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 mt-2">AI Generation</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Gemini AI transforms your raw information into structured professional content.</p>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-base-300 border border-white/10 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/20 z-20">03</div>
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-500 group-hover:text-primary transition-colors">
              <FaChartLine className="text-lg" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 mt-2">Edit & Optimize</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Refine your sections and match keywords to target a specific job description.</p>
          </div>

          {/* Step 4 */}
          <div className="p-8 rounded-3xl bg-base-100 border border-white/5 relative group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-base-300 border border-white/10 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/20 z-20">04</div>
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-500 group-hover:text-primary transition-colors">
              <FaFilePdf className="text-lg" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 mt-2">Download PDF</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Export a beautifully formatted, ATS-friendly professional PDF document.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
