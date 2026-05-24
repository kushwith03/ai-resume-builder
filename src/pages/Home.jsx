import React from "react";
import { Link } from "react-router-dom";
import { FaMagic, FaShieldAlt, FaChartLine, FaArrowRight, FaGlobe } from "react-icons/fa";

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
                        Smart resumes <br /> powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Gemini AI.</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                        A personal experiment in building the document architect of the future. 
                        InstaResume uses AI to transform your career story into high-performance, ATS-optimized resumes.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn">
                        <Link to="/generate-resume" className="btn btn-primary btn-lg px-10 rounded-full font-bold shadow-xl shadow-primary/20 group transition-all duration-300 hover:scale-105">
                            Launch Builder
                            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex flex-col gap-2">
                            <Link to="/about" className="btn btn-ghost btn-lg px-10 rounded-full font-bold text-slate-300 hover:bg-white/5 transition-all">
                                Project Story
                            </Link>
                            <a href="https://rkhushwith-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1.5">
                                Explore Portfolio <FaGlobe className="text-[8px]" />
                            </a>
                        </div>
                    </div>
                    
                    {/* Hero Image Mockup Area */}
                    <div className="mt-20 relative max-w-6xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-[2rem]"></div>
                        <div className="relative bg-[#0b1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[21/10] flex flex-col">
                            {/* Mock Browser Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-error/40"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-warning/40"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-success/40"></div>
                                </div>
                                <div className="bg-white/5 px-3 py-1 rounded-md text-[10px] text-slate-500 font-mono tracking-tight border border-white/5">
                                    instaresume.app/editor
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 border border-white/10 px-2 py-0.5 rounded">Portfolio Project Showcase</span>
                                </div>
                            </div>
                            
                            {/* Mock UI Content */}
                            <div className="flex-1 flex overflow-hidden">
                                {/* Mock Sidebar */}
                                <div className="w-48 border-r border-white/5 bg-white/[0.02] hidden md:flex flex-col p-4 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className={`h-8 rounded-lg ${i === 1 ? 'bg-primary/20 border border-primary/20' : 'bg-white/5 border border-white/5'} flex items-center px-3 gap-2`}>
                                            <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-primary' : 'bg-slate-700'}`}></div>
                                            <div className={`h-1.5 rounded-full ${i === 1 ? 'bg-primary/40 w-16' : 'bg-slate-700 w-20'}`}></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mock Editor */}
                                <div className="flex-1 p-6 flex flex-col gap-6 bg-white/[0.01]">
                                    <div className="space-y-3">
                                        <div className="h-2 w-24 bg-primary/40 rounded-full"></div>
                                        <div className="h-10 w-full bg-white/5 border border-white/10 rounded-xl"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-32 bg-slate-700 rounded-full"></div>
                                        <div className="h-32 w-full bg-white/5 border border-white/10 rounded-xl relative overflow-hidden p-4">
                                            <div className="space-y-2">
                                                <div className="h-1.5 w-full bg-slate-800 rounded-full animate-pulse"></div>
                                                <div className="h-1.5 w-4/5 bg-slate-800 rounded-full animate-pulse delay-75"></div>
                                                <div className="h-1.5 w-5/6 bg-slate-800 rounded-full animate-pulse delay-150"></div>
                                                <div className="h-1.5 w-2/3 bg-slate-800 rounded-full animate-pulse delay-300"></div>
                                            </div>
                                            <div className="absolute bottom-4 right-4 h-8 w-24 bg-primary/20 border border-primary/30 rounded-lg flex items-center justify-center">
                                                <FaMagic className="text-primary text-[10px] mr-2" />
                                                <div className="h-1 w-10 bg-primary/40 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-auto flex justify-between items-center">
                                        <div className="h-2 w-20 bg-slate-700 rounded-full"></div>
                                        <div className="h-8 w-24 bg-primary rounded-lg shadow-lg shadow-primary/20"></div>
                                    </div>
                                </div>

                                {/* Mock Resume Preview */}
                                <div className="flex-1 bg-white p-6 hidden sm:block overflow-hidden">
                                    <div className="max-w-[180px] mx-auto space-y-4">
                                        <div className="text-center space-y-1.5">
                                            <div className="h-3 w-32 bg-slate-900 rounded-full mx-auto"></div>
                                            <div className="h-1.5 w-24 bg-slate-400 rounded-full mx-auto"></div>
                                        </div>
                                        <div className="flex justify-center gap-2">
                                            <div className="h-1 w-10 bg-slate-300 rounded-full"></div>
                                            <div className="h-1 w-10 bg-slate-300 rounded-full"></div>
                                            <div className="h-1 w-10 bg-slate-300 rounded-full"></div>
                                        </div>
                                        <div className="space-y-2 pt-4">
                                            <div className="h-1.5 w-12 bg-slate-900 rounded-full"></div>
                                            <div className="h-1 w-full bg-slate-200 rounded-full"></div>
                                            <div className="h-1 w-full bg-slate-200 rounded-full"></div>
                                            <div className="h-1 w-5/6 bg-slate-200 rounded-full"></div>
                                        </div>
                                        <div className="space-y-2 pt-4">
                                            <div className="h-1.5 w-16 bg-slate-900 rounded-full"></div>
                                            <div className="h-1 w-full bg-slate-200 rounded-full"></div>
                                            <div className="h-1 w-full bg-slate-200 rounded-full"></div>
                                            <div className="h-1 w-4/5 bg-slate-200 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
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