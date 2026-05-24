import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaUsers, FaLightbulb, FaCheckCircle, FaArrowRight } from "react-icons/fa";

function About() {
  const values = [
    {
      icon: <FaRocket className="text-primary" />,
      title: "Our Mission",
      description: "To democratize professional success by providing everyone with high-performance, AI-driven career tools."
    },
    {
      icon: <FaLightbulb className="text-warning" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with Generative AI to give you a competitive edge."
    },
    {
      icon: <FaUsers className="text-success" />,
      title: "User Centric",
      description: "Every feature we build is designed to solve real-world career challenges for our community."
    }
  ];

  const features = [
    "Gemini AI v1.5 Integration",
    "ATS Keyword Optimization",
    "Real-time Score Analysis",
    "Professional PDF Export",
    "Interactive Live Editor",
    "Modern UI/UX Design"
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
              Reimagining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Career Journey.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10">
              InstaResume was born out of a simple observation: the traditional resume building process is broken. We've combined cutting-edge AI with expert career insights to build the document architect of the future.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-8 rounded-3xl bg-base-100 border border-white/5 hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Why Choose <span className="text-primary">InstaResume?</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                In today's competitive job market, a standard resume isn't enough. You need a document that's not only visually stunning but also technically optimized for the modern recruitment landscape.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-30 rounded-full"></div>
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                        alt="Team working on innovation" 
                        className="w-full h-auto object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 text-center">
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Ready to build your future?</h2>
              <p className="text-slate-300 text-lg">Join thousands of professionals who have accelerated their careers with InstaResume.</p>
              <Link to="/generate-resume" className="btn btn-primary btn-lg px-12 rounded-full font-black shadow-xl shadow-primary/20 group">
                Start Building Now
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full -ml-32 -mb-32"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
