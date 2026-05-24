import { Link } from "react-router-dom";
import { FaCode, FaBrain, FaArrowRight, FaGithub, FaTerminal, FaGlobe } from "react-icons/fa";

function About() {
  const techStack = [
    { name: "React + Vite", category: "Frontend" },
    { name: "TailwindCSS", category: "Styling" },
    { name: "Node.js + Express", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "Gemini AI v1.5", category: "AI Engine" },
    { name: "Vercel / Render", category: "Deployment" }
  ];

  const highlights = [
    {
      icon: <FaTerminal className="text-primary" />,
      title: "The Why",
      description: "I built this project to solve a real problem: creating high-quality, ATS-optimized resumes without the manual struggle. It was an opportunity to explore Generative AI integration in a practical way."
    },
    {
      icon: <FaCode className="text-success" />,
      title: "Technical Challenge",
      description: "Implementing real-time ATS scoring and AI-driven content generation required deep dives into prompt engineering and performance optimization for a smooth UI experience."
    },
    {
      icon: <FaBrain className="text-warning" />,
      title: "Learning Journey",
      description: "As a CS student, this project taught me the nuances of full-stack architecture, from managing complex form states in React to architecting scalable backend services."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] right-[10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              The Story behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">InstaResume.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10">
              A personal project born from a passion for AI and a desire to build tools that make a difference. 
              Designed and developed by R Khushwith Kumar.
            </p>
            <div className="flex justify-center gap-4">
               <a href="https://github.com/kushwith03/ai-resume-builder" target="_blank" rel="noopener noreferrer" className="btn btn-ghost border-white/10 rounded-2xl px-6">
                  <FaGithub className="mr-2" /> View Source
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div key={index} className="p-8 rounded-3xl bg-base-100 border border-white/5 hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Built with a <span className="text-primary">Modern Stack.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                This project was an exercise in building a production-grade application from scratch. 
                I focused on creating a seamless flow between the Gemini AI engine and the frontend editor.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {techStack.map((tech, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{tech.category}</p>
                    <p className="text-sm font-bold text-slate-200">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-30 rounded-full"></div>
                <div className="relative p-8 rounded-3xl overflow-hidden border border-white/10 bg-base-200 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-error"></div>
                        <div className="w-3 h-3 rounded-full bg-warning"></div>
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                    </div>
                    <div className="space-y-4 font-mono text-xs">
                        <p className="text-primary font-bold">const projectInfo = &#123;</p>
                        <p className="pl-4 text-slate-400">name: &quot;InstaResume&quot;,</p>
                        <p className="pl-4 text-slate-400">developer: &quot;R Khushwith Kumar&quot;,</p>
                        <p className="pl-4 text-slate-400">status: &quot;Active Portfolio Project&quot;,</p>
                        <p className="pl-4 text-slate-400">tech: [&quot;React&quot;, &quot;AI&quot;, &quot;Node&quot;, &quot;MongoDB&quot;]</p>
                        <p className="text-primary font-bold">&#125;;</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 text-center">
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Interested in the tech?</h2>
              <p className="text-slate-300 text-lg">Check out my other projects on GitHub or reach out for a collaboration.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/generate-resume" className="btn btn-primary btn-lg px-12 rounded-full font-black shadow-xl shadow-primary/20 group">
                    Try the Project
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://rkhushwith-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg px-10 rounded-full font-bold text-slate-300 hover:bg-white/5 transition-all">
                    Explore My Portfolio
                </a>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full -ml-32 -mb-32"></div>
          </div>
        </div>
      </section>

      {/* Footer Portfolio Link */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
            <p className="text-slate-500 text-sm mb-4">Want to see more of my work?</p>
            <a href="https://rkhushwith-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                Visit R Khushwith Kumar&apos;s Portfolio <FaGlobe className="text-xs" />
            </a>
        </div>
      </section>
    </div>
  );
}

export default About;
