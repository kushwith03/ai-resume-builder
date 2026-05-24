import React from "react";
import { Link } from "react-router-dom";
import { FaMagic, FaTwitter, FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-base-100 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all">
                <FaMagic className="text-primary text-lg" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">Insta<span className="text-primary">Resume</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Architecting the future of career documents with the power of Gemini AI. Build high-performance, ATS-optimized resumes in seconds.
            </p>
            <div className="flex gap-4">
              {[FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-all">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-tight">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/generate-resume" className="text-slate-500 hover:text-primary transition-colors text-sm">Resume Builder</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-primary transition-colors text-sm">AI Features</Link></li>
              <li><Link to="/about" className="text-slate-500 hover:text-primary transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-tight">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-slate-500 hover:text-primary transition-colors text-sm">Contact Support</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-tight">Stay Updated</h4>
            <p className="text-slate-500 text-sm">Join our community for the latest career tips and AI updates.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-primary/50 w-full" />
              <button className="bg-primary hover:bg-primary-focus p-2 rounded-lg text-white transition-colors">
                <FaMagic className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} InstaResume Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <span>Built with</span>
            <FaHeart className="text-error animate-pulse" />
            <span>by</span>
            <span className="text-slate-300 font-bold hover:text-primary transition-colors cursor-default">Kushwith_03</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
