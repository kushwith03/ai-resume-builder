import { Link } from "react-router-dom";
import { FaMagic, FaLinkedin, FaGithub, FaHeart, FaGlobe } from "react-icons/fa";

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
              An AI-driven resume architect exploring the potential of Gemini AI in modern career tools. 
              Designed and developed by R Khushwith Kumar as a technical portfolio showcase.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/kushwith03" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-all">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/kushwith03/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-all">
                <FaLinkedin />
              </a>
              <a href="https://rkhushwith-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-all" title="View Portfolio">
                <FaGlobe className="text-xs" />
              </a>
            </div>
          </div>

          {/* Quick Nav & Portfolio CTA */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-24">
            <div className="space-y-6">
              <h4 className="text-white font-bold tracking-tight text-sm uppercase">Project</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-slate-500 hover:text-primary transition-colors text-sm">Project Story</Link></li>
                <li><Link to="/services" className="text-slate-500 hover:text-primary transition-colors text-sm">Capabilities</Link></li>
                <li><Link to="/contact" className="text-slate-500 hover:text-primary transition-colors text-sm">Feedback</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-bold tracking-tight text-sm uppercase">Developer</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://rkhushwith-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm">
                    View Portfolio
                    <FaGlobe className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li><a href="mailto:kushwith03@gmail.com" className="text-slate-500 hover:text-primary transition-colors text-sm">Get in Touch</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
            Portfolio Project &copy; {new Date().getFullYear()} R Khushwith Kumar
          </p>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <span>Built with</span>
            <FaHeart className="text-error animate-pulse" />
            <span>by</span>
            <a href="https://rkhushwith-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-slate-300 font-bold hover:text-primary transition-colors">
              R Khushwith Kumar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
