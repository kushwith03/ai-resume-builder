import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe, FaCode, FaUserGraduate, FaTerminal, FaRocket } from "react-icons/fa";

function Contact() {
  const techStack = [
    "React", "Node.js", "Express", "MongoDB", "Gemini AI", "TailwindCSS", "Java"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Connect.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing technical challenges, collaboration opportunities, or feedback on this project.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Quick Links */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-tight">Direct Channels</h3>
                <p className="text-slate-400">Feel free to reach out directly through any of these platforms.</p>
              </div>

              <div className="space-y-8">
                <a href="mailto:kushwith03@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Me</p>
                    <p className="text-slate-200 font-bold">kushwith03@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-success group-hover:bg-success/20 transition-colors">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Based in</p>
                    <p className="text-slate-200 font-bold">Bangalore, India</p>
                  </div>
                </div>

                <a href="https://rkhushwith-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-warning group-hover:bg-warning/20 transition-colors">
                    <FaGlobe />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Portfolio</p>
                    <p className="text-slate-200 font-bold">Explore My Work</p>
                  </div>
                </a>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Social Profiles</p>
                <div className="flex gap-4">
                  <a href="https://github.com/kushwith03" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <FaGithub className="text-xl" />
                  </a>
                  <a href="https://www.linkedin.com/in/kushwith03/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Developer Spotlight Card */}
            <div className="lg:col-span-8">
              <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem]">
                <div className="bg-base-100 p-8 md:p-12 rounded-[1.9rem] space-y-10">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-success">Open for Collaboration</span>
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">R Khushwith Kumar</h2>
                        <p className="text-slate-400 leading-relaxed max-w-xl">
                            Final year Computer Science student passionate about building intelligent full-stack applications. 
                            Currently focusing on integrating Large Language Models (LLMs) into production-ready web tools.
                        </p>
                    </div>
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-3xl text-primary border border-primary/20">
                        <FaUserGraduate />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div className="space-y-4">
                        <h4 className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-tight">
                            <FaTerminal className="text-primary text-xs" />
                            Core Toolkit
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map(tech => (
                                <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/5 text-slate-300 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-tight">
                            <FaRocket className="text-secondary text-xs" />
                            Current Focus
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Exploring full-stack AI integration and architecting high-performance web systems with clean, scalable code.
                        </p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                        Based in Bangalore, India
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://rkhushwith-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm px-6 rounded-xl font-black shadow-lg shadow-primary/20">
                            View Portfolio
                        </a>
                        <a href="https://github.com/kushwith03" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm text-slate-400 font-bold hover:text-white">
                            <FaGithub className="mr-2" /> GitHub
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
