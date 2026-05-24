import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaTwitter, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission would go here
  };

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
            Have feedback on InstaResume or want to collaborate on something interesting? 
            I'm always open to discussing new ideas and technical challenges.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-tight">Personal Links</h3>
                <p className="text-slate-400">Feel free to reach out through any of these platforms or use the form.</p>
              </div>

              <div className="space-y-8">
                <a href="mailto:support@instaresume.app" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</p>
                    <p className="text-slate-200 font-bold">support@instaresume.app</p>
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
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Social Channels</p>
                <div className="flex gap-4">
                  <a href="https://github.com/kushwith03" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/kushwith03/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <FaLinkedin />
                  </a>
                  <a href="https://twitter.com/kushwith03" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem]">
                <div className="bg-base-100 p-8 md:p-12 rounded-[1.9rem]">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label-text mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                        <input type="text" placeholder="John Doe" className="input bg-white/5 border-white/5 focus:border-primary/50 text-slate-200" required />
                      </div>
                      <div className="form-control">
                        <label className="label-text mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="input bg-white/5 border-white/5 focus:border-primary/50 text-slate-200" required />
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label-text mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                      <input type="text" placeholder="Feedback / Collaboration" className="input bg-white/5 border-white/5 focus:border-primary/50 text-slate-200" required />
                    </div>

                    <div className="form-control">
                      <label className="label-text mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                      <textarea placeholder="Tell me more..." className="textarea h-40 bg-white/5 border-white/5 focus:border-primary/50 text-slate-200 resize-none" required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full md:w-auto px-10 rounded-2xl font-black shadow-xl shadow-primary/20 group">
                      Send Message
                      <FaPaperPlane className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-xs" />
                    </button>
                  </form>
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
