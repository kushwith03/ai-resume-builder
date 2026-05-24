import { Link } from "react-router-dom";
import { FaMagic, FaShieldAlt, FaChartBar, FaFilePdf, FaRobot, FaBriefcase, FaArrowRight } from "react-icons/fa";

function Services() {
  const capabilities = [
    {
      icon: <FaMagic className="text-primary" />,
      title: "AI Resume Architect",
      description: "Uses Gemini AI v1.5 to transform raw career notes into professional, impact-focused resume content.",
      features: ["Natural language processing", "Context-aware phrasing", "Dynamic formatting"]
    },
    {
      icon: <FaShieldAlt className="text-success" />,
      title: "ATS Optimization",
      description: "Engineered to follow standard recruitment parsing rules, ensuring high readability for tracking systems.",
      features: ["Keyword matching logic", "Standardized layouts", "Clean data structures"]
    },
    {
      icon: <FaChartBar className="text-warning" />,
      title: "Real-time Analysis",
      description: "Instant feedback on resume quality and job description alignment using custom scoring algorithms.",
      features: ["Live match scoring", "Missing keyword detection", "Visual metrics"]
    },
    {
      icon: <FaFilePdf className="text-info" />,
      title: "Smart PDF Export",
      description: "Generates high-fidelity PDFs using @react-pdf/renderer for consistent cross-platform document quality.",
      features: ["Vector-based output", "Standard font embedding", "Print-ready layout"]
    },
    {
      icon: <FaRobot className="text-secondary" />,
      title: "AI Summarizer",
      description: "Generates compelling professional summaries that highlight core strengths and technical expertise.",
      features: ["Action-oriented tone", "Skill-centric content", "Personalized style"]
    },
    {
      icon: <FaBriefcase className="text-error" />,
      title: "Requirement Mapping",
      description: "Analyzes job descriptions to help align professional experience with specific role requirements.",
      features: ["Semantic analysis", "Priority keyword identification", "Alignment tips"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[60%] bg-secondary/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Capabilities.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Exploring the limits of AI-driven career tools. Here&apos;s a breakdown of the core technical features implemented in this project.
          </p>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((item, index) => (
              <div key={index} className="p-8 rounded-3xl bg-base-100 border border-white/5 hover:border-primary/20 transition-all group flex flex-col h-full">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6 flex-grow text-sm">{item.description}</p>
                <div className="space-y-3">
                  {item.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logic Flow Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Technical Flow</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Data Ingestion", desc: "Raw input is parsed and sanitized for AI processing." },
              { step: "02", title: "AI Generation", desc: "Gemini AI crafts structured resume blocks." },
              { step: "03", title: "ATS Scoring", desc: "Custom logic calculates match scores & gaps." },
              { step: "04", title: "PDF Rendering", desc: "Client-side generation of optimized PDFs." }
            ].map((item, index) => (
              <div key={index} className="relative p-6 text-center space-y-4">
                <span className="text-5xl font-black text-white/5 absolute top-0 left-1/2 -translate-x-1/2">{item.step}</span>
                <h4 className="text-lg font-bold text-white relative z-10">{item.title}</h4>
                <p className="text-sm text-slate-400 relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
            <Link to="/generate-resume" className="btn btn-primary btn-lg px-12 rounded-full font-black shadow-xl shadow-primary/20 group">
                Try it Out
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
