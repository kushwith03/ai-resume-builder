import React from "react";
import { FaMagic, FaTwitter, FaLinkedin, FaGithub, FaHeart, FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-base-100 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Project Info */}
          <div className="max-w-md space-y-6">
            <div className="flex items-center gap-2.5 group">
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all">
                <FaMagic className="text-primary text-lg" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">Insta<span className="text-primary">Resume</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              An AI-powered document architect built to solve the modern resume challenge. 
              This project explores the intersection of Generative AI and career development 
              tools using the Gemini AI v1.5 engine.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/kushwith03" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-all">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/kushwith03/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-all">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-all">
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-white font-bold tracking-tight text-sm uppercase">Navigation</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-slate-500 hover:text-primary transition-colors text-sm">Home</a></li>
                <li><a href="/about" className="text-slate-500 hover:text-primary transition-colors text-sm">Project Story</a></li>
                <li><a href="/services" className="text-slate-500 hover:text-primary transition-colors text-sm">Capabilities</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-bold tracking-tight text-sm uppercase">Connect</h4>
              <ul className="space-y-3">
                <li><a href="/contact" className="text-slate-500 hover:text-primary transition-colors text-sm">Feedback</a></li>
                <li><a href="mailto:support@instaresume.app" className="text-slate-500 hover:text-primary transition-colors text-sm">Email Me</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
            Personal Project &copy; {new Date().getFullYear()} R Khushwith Kumar
          </p>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <span>Crafted with</span>
            <FaHeart className="text-error animate-pulse" />
            <span>by</span>
            <span className="text-slate-300 font-bold hover:text-primary transition-colors cursor-default">Khushwith</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
