import { useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane, FaSave, FaChartBar, FaUndo, FaMagic } from "react-icons/fa";
import { generateResume, trackAnalytics, saveResumeToDB } from "../api/ResumeService";
import { useForm, useFieldArray } from "react-hook-form";
import Resume from "../Components/Resume";
import { performanceTracker } from "../utils/performanceTracker";
import { calculateATSScore } from "../services/atsService";
import { useDebounce } from "../hooks/useDebounce";
import FormSection, { RenderFieldArray } from "../Components/ResumeFormSections";
import GenerationLoader from "../Components/GenerationLoader";

const GenerateResume = () => {
  const [data, setData] = useState({
    personalInformation: { 
      fullName: "", 
      title: "", 
      email: "", 
      location: "", 
      phoneNumber: "",
    },
    socialLinks: [],
    summary: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    achievements: [],
    positionsOfResponsibility: [],
  });

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: data,
  });

  const formData = watch();
  const debouncedFormData = useDebounce(formData, 800);

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [currentMetrics, setCurrentMetrics] = useState(performanceTracker.getAverageMetrics());

  const debouncedJD = useDebounce(jobDescription, 800);

  const fieldArrays = {
    socialLinks: useFieldArray({ control, name: "socialLinks" }),
    skills: useFieldArray({ control, name: "skills" }),
    experience: useFieldArray({ control, name: "experience" }),
    education: useFieldArray({ control, name: "education" }),
    projects: useFieldArray({ control, name: "projects" }),
    certifications: useFieldArray({ control, name: "certifications" }),
    achievements: useFieldArray({ control, name: "achievements" }),
    positionsOfResponsibility: useFieldArray({ control, name: "positionsOfResponsibility" }),
  };

  const onSubmit = useCallback((formData) => {
    setData(formData);
    setShowFormUI(false);
    setShowResumeUI(true);
    setCurrentMetrics(performanceTracker.getAverageMetrics());
    trackAnalytics("form_submit_preview");
  }, []);

  const handleGenerate = async () => {
    if (!description.trim()) return toast.error("Please provide a career description");

    performanceTracker.startMeasure();
    setLoading(true);
    
    try {
      const response = await generateResume(description);
      reset(response.data);
      setShowFormUI(true);
      setShowPromptInput(false);
      trackAnalytics("generate_resume_success");
      toast.success("AI draft created successfully");
    } catch (error) {
      console.error("AI Generation failed:", error);
      const status = error.response?.status;
      const errorMessage = error.response?.data?.error;

      if (status === 429) {
        toast.error("AI service is currently at capacity. Please try again in a minute.", { duration: 6000 });
      } else {
        toast.error(errorMessage || "AI service temporarily unavailable. Please retry shortly.");
      }

      trackAnalytics("generate_resume_quota_exhausted");
      
      setTimeout(() => {
        if (!showFormUI) {
          toast("Tip: You can still use the builder manually to explore the editor!", {
            icon: '💡',
            duration: 5000
          });
        }
      }, 2000);
    } finally {
      setLoading(false);
      performanceTracker.endMeasure("AI_Generation");
      setCurrentMetrics(performanceTracker.getAverageMetrics());
    }
  };

  const atsResult = useMemo(() => {
    if (!debouncedJD) return null;
    return calculateATSScore(showFormUI ? formData : data, debouncedJD);
  }, [formData, data, debouncedJD, showFormUI]);

  const [isSaving, setIsSaving] = useState(false);

  const resetGenerator = () => {
    setShowPromptInput(true);
    setShowFormUI(false);
    setShowResumeUI(false);
    setJobDescription("");
    setDescription("");
  };

  return (
    <div className={`mx-auto p-4 md:p-8 min-h-[90vh] pb-24 md:pb-32 transition-all duration-500 ${showFormUI ? 'max-w-[1440px]' : 'max-w-4xl'}`}>
      <GenerationLoader isLoading={loading} />
      {showPromptInput && (
        <div className="flex flex-col items-center justify-center py-10 md:py-16 gap-8 animate-fadeIn">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <FaPaperPlane className="text-primary text-xs" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Engine Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Craft your <span className="text-primary">Future.</span></h1>
            <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed text-center">Describe your professional background in plain English, and this AI-powered engine will architect a high-performance resume draft for you.</p>
          </div>

          <div className="w-full max-w-2xl group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-20 group-hover:opacity-40 transition-opacity rounded-3xl"></div>
              <div className="relative bg-base-200 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea w-full h-40 md:h-56 bg-transparent border-none text-base text-slate-200 focus:ring-0 p-6 md:p-8 leading-relaxed resize-none placeholder:text-slate-600"
                  placeholder="e.g. I am a Senior Frontend Engineer with 8 years of experience building scalable React applications. I have led teams of 5 and specialized in high-performance UI architecture..."
                />
                <div className="p-4 bg-white/5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest md:ml-4">Min. 50 characters recommended</span>
                  <button
                    onClick={handleGenerate}
                    disabled={loading || description.length < 10}
                    className="btn btn-primary w-full md:w-auto px-8 rounded-2xl font-black shadow-lg shadow-primary/20 group/btn"
                  >
                    {loading ? <span className="loading loading-spinner loading-sm"></span> : (
                      <>
                        Generate Draft
                        <FaMagic className="ml-2 group-hover/btn:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFormUI && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn relative">
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 space-y-4 md:space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Editor</h2>
              {atsResult && (
                <div className="flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ATS Match</span>
                  <div className={`text-sm font-black ${atsResult.score >= 70 ? 'text-success' : atsResult.score >= 40 ? 'text-warning' : 'text-error'}`}>
                    {atsResult.score}%
                  </div>
                </div>
              )}
            </div>

            <FormSection title="Identity">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="form-control md:col-span-2">
                  <label className="label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name *</label>
                  <input {...register("personalInformation.fullName")} className="input input-bordered h-10 bg-base-100 border-white/5 focus:border-primary/50 text-sm" placeholder="John Doe" />
                </div>
                <div className="form-control">
                  <label className="label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Job Title *</label>
                  <input {...register("personalInformation.title")} className="input input-bordered h-10 bg-base-100 border-white/5 focus:border-primary/50 text-sm" placeholder="Software Engineer" />
                </div>
                <div className="form-control">
                  <label className="label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email *</label>
                  <input {...register("personalInformation.email")} className="input input-bordered h-10 bg-base-100 border-white/5 focus:border-primary/50 text-sm" placeholder="john@example.com" />
                </div>
                <div className="form-control">
                  <label className="label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Location *</label>
                  <input {...register("personalInformation.location")} className="input input-bordered h-10 bg-base-100 border-white/5 focus:border-primary/50 text-sm" placeholder="New York, NY" />
                </div>
                <div className="form-control">
                  <label className="label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                  <input {...register("personalInformation.phoneNumber")} className="input input-bordered h-10 bg-base-100 border-white/5 focus:border-primary/50 text-sm" placeholder="+1 234 567 890" />
                </div>
              </div>
            </FormSection>

            <RenderFieldArray fields={fieldArrays.socialLinks} label="Professional Links" name="socialLinks" keys={["label", "url"]} register={register} watch={watch} />

            <FormSection title="Professional Summary">
              <textarea {...register("summary")} className="textarea textarea-bordered w-full h-24 md:h-32 bg-base-100 border-white/5 focus:border-primary/50 text-sm leading-relaxed" placeholder="Brief overview of your career..." />
            </FormSection>

            <RenderFieldArray fields={fieldArrays.skills} label="Technical Skills" name="skills" keys={["category", "skills"]} register={register} watch={watch} />
            <RenderFieldArray fields={fieldArrays.experience} label="Work Experience" name="experience" keys={["jobTitle", "company", "duration", "responsibility"]} register={register} watch={watch} />      
            <RenderFieldArray fields={fieldArrays.education} label="Education" name="education" keys={["degree", "university", "location", "graduationYear"]} register={register} watch={watch} />        
            <RenderFieldArray fields={fieldArrays.projects} label="Key Projects" name="projects" keys={["title", "description", "technologiesUsed"]} register={register} watch={watch} />
            <RenderFieldArray fields={fieldArrays.certifications} label="Certifications" name="certifications" keys={["title", "issuer", "date"]} register={register} watch={watch} />
            <RenderFieldArray fields={fieldArrays.achievements} label="Awards & Achievements" name="achievements" keys={["award", "organization", "date"]} register={register} watch={watch} />
            <RenderFieldArray fields={fieldArrays.positionsOfResponsibility} label="Leadership & Responsibility" name="positionsOfResponsibility" keys={["title", "organization", "duration", "description"]} register={register} watch={watch} />

            <div className="flex lg:hidden flex-col gap-4 pt-6">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="btn btn-primary w-full rounded-2xl font-black shadow-lg shadow-primary/20"
              >
                Preview & Export
              </button>
              <button
                type="button"
                onClick={resetGenerator}
                className="btn btn-ghost w-full text-slate-500 font-bold"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Live Preview Panel - Locked A4 Aspect Ratio */}
          <div className="hidden lg:flex lg:col-span-5 sticky top-20 h-[calc(100vh-100px)] flex-col bg-base-300/30 rounded-3xl border border-white/5 overflow-hidden shadow-2xl font-sans transition-all">
            <div className="w-full p-4 bg-white/5 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live High-Fidelity Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mr-2 flex items-center gap-1 opacity-60">
                  <FaSave className="text-[8px]" /> Draft Synced
                </div>
                <button onClick={resetGenerator} className="btn btn-ghost btn-xs h-8 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[9px]">
                  Reset
                </button>
              </div>
            </div>

            <div className="w-full h-full overflow-y-auto p-4 custom-scrollbar bg-slate-900/50 backdrop-blur-sm">      
               <div className="max-w-[210mm] mx-auto bg-white shadow-2xl origin-top transition-transform">
                 <Resume data={debouncedFormData} hideDownload={true} previewMode={true} />     
               </div>
            </div>
          </div>
        </div>
      )}

      {showResumeUI && (
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 animate-fadeIn pb-20">      
          <div className="bg-base-200 p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-10 relative">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">ATS Optimization</h3>
                <p className="text-slate-400 text-sm md:text-base">Precision analysis of your resume against industry standards.</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Matching Score</span>
                <div className={`text-4xl md:text-5xl font-black ${atsResult?.score >= 70 ? 'text-success' : atsResult?.score >= 40 ? 'text-warning' : 'text-error'}`}>
                   {atsResult?.score || 0}%
                </div>
              </div>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target Job Description to see your real-time matching score..."
              className="textarea textarea-bordered w-full h-32 md:h-40 bg-base-100 border-white/10 focus:border-primary/50 text-slate-300 p-4 md:p-6 rounded-2xl transition-all text-sm"   
            />

            {atsResult && atsResult.missingKeywords.length > 0 && (
               <div className="mt-8 animate-fadeIn">
                  <p className="text-xs font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Priority Keywords to Add:</p>
                  <div className="flex flex-wrap gap-2">
                    {atsResult.missingKeywords.map(kw => (
                      <span key={kw} className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold rounded-lg uppercase tracking-wider">{kw}</span>
                    ))}
                  </div>
               </div>
            )}
          </div>

          <div className="relative group overflow-x-auto md:overflow-visible">
            <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity hidden md:block pointer-events-none"></div>
            <Resume data={data} />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 pt-6 md:pt-10">
            <button onClick={() => { setShowResumeUI(false); setShowFormUI(true); }} className="btn btn-ghost text-slate-400 font-bold hover:text-white transition-all order-2 sm:order-1"> 
              <FaUndo className="mr-2 text-xs" /> Edit Draft
            </button>
            <div className="flex items-center gap-3 p-2 bg-base-200 rounded-2xl border border-white/5 shadow-xl w-full sm:w-auto order-1 sm:order-2">
              <button
                disabled={isSaving}
                onClick={async () => {
                  setIsSaving(true);
                  try {
                    await saveResumeToDB(data, atsResult?.score || 0);
                    toast.success("Sync complete: Saved to cloud");
                  } catch {
                    toast.error("Database connection failure");
                  } finally {
                    setIsSaving(false);
                  }
                }}
                className="btn btn-primary flex-1 sm:flex-none px-8 rounded-xl font-black shadow-lg shadow-primary/20"
              >
                {isSaving ? <span className="loading loading-spinner loading-xs"></span> : <FaSave className="mr-2" />}
                {isSaving ? "Saving..." : "Save Progress"}
              </button>
              <button onClick={resetGenerator} className="btn btn-ghost btn-square rounded-xl hover:bg-white/5">
                <FaPaperPlane className="text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Performance Monitor - Redesigned for safety */}
      <div className="fixed bottom-6 right-6 z-[120] hidden md:block pointer-events-none">
        <div className="dropdown dropdown-top dropdown-end pointer-events-auto">
          <div tabIndex={0} role="button" className="btn btn-circle bg-base-300 border-white/10 shadow-2xl hover:scale-110 transition-transform">
            <FaChartBar className="text-primary" />
          </div>
          <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-72 p-6 shadow-2xl bg-base-300 border border-white/10 mb-4 rounded-3xl backdrop-blur-xl">
            <h3 className="font-black text-xs text-white uppercase tracking-[0.2em] mb-4 border-b border-white/5 pb-2">System Health</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">UI Status</span>
                 <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-black rounded uppercase tracking-widest">{currentMetrics.smoothnessScore}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Latency</span>
                 <span className="text-xs font-mono text-white">{currentMetrics.avgInputLatency}ms</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Efficiency</span>
                 <span className="text-xs font-mono text-white">{currentMetrics.avgRenderTime}ms</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateResume;
