import React from "react";
import { Link } from "react-router-dom";
import { FaMagic, FaShieldAlt, FaChartLine, FaArrowRight } from "react-icons/fa";

function Home() {
    return (
        <div className="flex flex-col min-h-[90vh]">
            {/* Hero Section */}
            <div className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
                {/* Background Accents */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute top-[-10%] left-[10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[50%] bg-secondary/10 blur-[100px] rounded-full"></div>
                </div>

                <div className="container mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fadeIn">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Powered by Gemini AI v1.5</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
                        Your dream career <br /> starts with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">InstaResume.</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                        The professional document architect that transforms your career story into high-performance, ATS-optimized resumes in seconds.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn">
                        <Link to="/generate-resume" className="btn btn-primary btn-lg px-10 rounded-full font-bold shadow-xl shadow-primary/20 group transition-all duration-300 hover:scale-105">
                            Create My Resume
                            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/about" className="btn btn-ghost btn-lg px-10 rounded-full font-bold text-slate-300 hover:bg-white/5 transition-all">
                            Explore Features
                        </Link>
                    </div>
                    
                    {/* Hero Image Mockup Area */}
                    <div className="mt-20 relative max-w-5xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-30 rounded-3xl"></div>
                        <div className="relative bg-[#0b1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4 text-slate-500 opacity-40">
                                <FaMagic className="text-5xl" />
                                <span className="font-bold tracking-widest uppercase text-xs">InstaResume Editor Preview</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="p-8 rounded-3xl bg-base-100 border border-white/5 hover:border-primary/20 transition-all group">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <FaMagic className="text-primary text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">AI Intelligence</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Our advanced AI analyzes your career path and generates professional summaries and bullet points that shine.
                            </p>
                        </div>
                        
                        <div className="p-8 rounded-3xl bg-base-100 border border-white/5 hover:border-primary/20 transition-all group">
                            <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-success/20 transition-colors">
                                <FaShieldAlt className="text-success text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">ATS Optimized</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Guaranteed to pass through Applicant Tracking Systems with clean formatting and keyword-rich content.
                            </p>
                        </div>
                        
                        <div className="p-8 rounded-3xl bg-base-100 border border-white/5 hover:border-primary/20 transition-all group">
                            <div className="w-12 h-12 bg-warning/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-warning/20 transition-colors">
                                <FaChartLine className="text-warning text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Live Analytics</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Real-time feedback on your resume&apos;s impact and matching score for specific job descriptions.
                            </p>                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;