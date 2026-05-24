import React from "react";
import { Link } from "react-router-dom";
import { FaMagic, FaShieldAlt, FaChartBar, FaFilePdf, FaRobot, FaBriefcase, FaArrowRight } from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaMagic className="text-primary" />,
      title: "AI Resume Architect",
      description: "Harness the power of Gemini AI v1.5 to generate professional resume drafts from simple natural language descriptions.",
      features: ["Natural language processing", "Industry-specific phrasing", "Dynamic content generation"]
    },
    {
      icon: <FaShieldAlt className="text-success" />,
      title: "ATS Optimization",
      description: "Our algorithms ensure your resume is perfectly formatted and keyword-optimized to pass through any Applicant Tracking System.",
      features: ["Keyword density analysis", "Standard formatting compliance", "Compatibility checking"]
    },
    {
      icon: <FaChartBar className="text-warning" />,
      title: "Career Analytics",
      description: "Get real-time feedback on your resume's performance, including match scores for specific job descriptions.",
      features: ["Real-time scoring", "Gap analysis", "Keyword suggestions"]
    },
    {
      icon: <FaFilePdf className="text-info" />,
      title: "Smart Export",
      description: "Export your resume in clean, professional, and high-quality PDF formats ready for immediate application.",
      features: ["Print-ready quality", "Standardized layouts", "Instant downloads"]
    },
    {
      icon: <FaRobot className="text-secondary" />,
      title: "AI Summary Assistant",
      description: "Let our AI write compelling professional summaries and impactful bullet points that highlight your achievements.",
      features: ["Action-verb optimization", "Impact-focused content", "Personalized tone"]
    },
    {
      icon: <FaBriefcase className="text-error" />,
      title: "Job Matching",
      description: "Analyze how well your profile matches the requirements of your target roles and industries.",
      features: ["Requirement mapping", "Role-specific tips", "Skill alignment"]
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
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Career Solutions.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            From AI-powered drafting to deep ATS optimization, we provide the tools you need to stand out in the modern job market.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-8 rounded-3xl bg-base-100 border border-white/5 hover:border-primary/20 transition-all group flex flex-col h-full">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6 flex-grow">{service.description}</p>
                <div className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                      <span className="text-xs font-medium text-slate-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How it Works</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Input Background", desc: "Describe your career history in plain text." },
              { step: "02", title: "AI Generation", desc: "Our engine crafts a high-performance draft." },
              { step: "03", title: "ATS Optimization", desc: "Refine and match against job descriptions." },
              { step: "04", title: "Professional Export", desc: "Download your PDF and apply with confidence." }
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

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
            <Link to="/generate-resume" className="btn btn-primary btn-lg px-12 rounded-full font-black shadow-xl shadow-primary/20 group">
                Experience the Difference
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
