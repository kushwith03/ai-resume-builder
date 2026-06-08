import React from "react";
import { SECTIONS } from "../../utils/constants";

const SectionNav = ({ activeSection, onNavClick }) => {
  return (
    <>
      <div className="hidden 2xl:flex fixed left-[max(1rem,calc(50vw-880px))] top-1/2 -translate-y-1/2 flex-col gap-2 p-2 bg-base-200/50 backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl z-[150] transition-all">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavClick(section.id)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all group relative ${activeSection === section.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="text-sm">{section.icon}</span>
            <div className="absolute left-14 px-3 py-1.5 bg-base-300 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
              {section.label}
            </div>
          </button>
        ))}
      </div>

      <div className="2xl:hidden z-[80] w-full px-4 md:px-8 py-3 bg-base-300/80 backdrop-blur-lg border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavClick(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${activeSection === section.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/5 border-transparent text-slate-500'}`}
          >
            <span className="text-xs">{section.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{section.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default SectionNav;
