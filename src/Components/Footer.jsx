import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-10 mt-auto border-t border-white/5 bg-base-100">
      <div className="container mx-auto px-6 text-center">
        <p className="text-slate-500 text-sm font-medium tracking-wide">
          Built with <span className="text-error mx-1">❤️</span> by <span className="text-slate-300 font-bold hover:text-primary transition-colors cursor-default">Kushwith_03</span>
        </p>
        <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-[0.2em] font-black">
          &copy; {new Date().getFullYear()} ResuAI Systems
        </p>
      </div>
    </footer>
  );
};

export default Footer;
