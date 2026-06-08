import React from "react";
import toast from "react-hot-toast";

const PromptInput = ({ 
  hasDraft, 
  handleRestoreDraft, 
  setHasDraft, 
  description, 
  setDescription, 
  handleGenerate, 
  loading 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-16 gap-8 animate-fadeIn max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Create Your <span className="text-primary">Resume</span></h1>
      </div>

      <div className="w-full space-y-4">
        {hasDraft && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-sm font-medium text-white">You have an unsaved resume draft.</span>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => { localStorage.removeItem('resume_draft'); setHasDraft(false); }} className="btn btn-ghost btn-sm text-slate-400 hover:text-white flex-1 md:flex-none">Discard</button>
              <button onClick={handleRestoreDraft} className="btn btn-primary btn-sm flex-1 md:flex-none">Restore Draft</button>
            </div>
          </div>
        )}

        <div className="relative bg-base-200 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea w-full h-48 md:h-64 bg-transparent border-none text-sm text-slate-200 focus:ring-0 p-6 leading-relaxed resize-none placeholder:text-slate-600"
            placeholder={`Describe yourself, paste resume content, or paste AI-generated profile information.\n\nExamples:\n• Final year CSE student skilled in Java and React...\n• Existing resume text...\n• ChatGPT / Gemini / Claude output...`}
          />
          
          <div className="absolute top-4 right-6 flex items-center gap-3">
            <span className={`text-[10px] font-mono ${description.length < 50 ? 'text-slate-500' : 'text-primary'}`}>
              {description.length} characters
            </span>
          </div>

          <div className="p-4 bg-white/5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-slate-500 font-medium md:ml-2">
              Describe yourself, paste resume content, or paste AI-generated profile information.
            </p>
            <button
              onClick={handleGenerate}
              disabled={loading || description.length < 30}
              className="btn btn-primary w-full md:w-auto px-8 rounded-xl font-black shadow-lg shadow-primary/20"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Generate Resume"}
            </button>
          </div>
        </div>

        <div className="p-5 bg-base-200/50 border border-dashed border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-bold text-white">Already have information elsewhere?</p>
            <p className="text-[10px] text-slate-500">Use ChatGPT, Gemini, or Claude to organize it first.</p>
          </div>
          <button 
            type="button"
            onClick={() => {
              const prompt = `Create a structured professional profile using all information you know about me or that I provide.\n\nThe information I provide may be:\n* a career description\n* existing resume text\n* AI-generated profile information\n* project details\n* messy notes\n* professional summaries\n* mixed information from multiple sources\n\nYour task:\n* Extract useful information\n* Organize information professionally\n* Remove duplicate or unnecessary information\n* Convert work into impact-driven bullet points\n* Group technical skills logically\n* Improve wording while preserving facts\n* Prioritize explicit instructions over raw text\n\nInclude sections when information exists:\n* Personal Information\n* Education\n* Experience\n* Projects\n* Skills\n* Certifications\n* Achievements\n* Positions of Responsibility\n* Professional Links\n\nRequirements:\n* Use concise professional language\n* Remove conversational filler\n* Do not include greetings or explanations\n* Return only structured profile content\n* If information is missing, do not invent details\n\nMy information:`;
              navigator.clipboard.writeText(prompt);
              toast.success("AI Prompt copied to clipboard");
            }}
            className="btn btn-ghost btn-sm text-[10px] font-black uppercase tracking-widest border border-white/5 bg-white/5 hover:bg-white/10 rounded-lg h-9"
          >
            Copy AI Prompt
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">You can paste:</span>
          {['Resume Text', 'Career Description', 'AI-generated Profile', 'Old Content'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-slate-700"></div>
              <span className="text-[10px] text-slate-500 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
