import { useState, useMemo, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane, FaSave, FaChartBar, FaUndo, FaMagic, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaCertificate, FaTrophy, FaUsers, FaLink, FaAlignLeft } from "react-icons/fa";
import { generateResume, trackAnalytics, saveResumeToDB } from "../api/ResumeService";
import { useForm, useFieldArray } from "react-hook-form";
import Resume from "../Components/Resume";
import { performanceTracker } from "../utils/performanceTracker";
import { calculateATSScore } from "../services/atsService";
import { useDebounce } from "../hooks/useDebounce";
import FormSection, { RenderFieldArray } from "../Components/ResumeFormSections";
import GenerationLoader from "../Components/GenerationLoader";

const SECTIONS = [
  { id: 'identity', label: 'Identity', icon: <FaUser /> },
  { id: 'socialLinks', label: 'Links', icon: <FaLink /> },
  { id: 'summary', label: 'Summary', icon: <FaAlignLeft /> },
  { id: 'skills', label: 'Skills', icon: <FaCode /> },
  { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
  { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
  { id: 'projects', label: 'Projects', icon: <FaPaperPlane /> },
  { id: 'certifications', label: 'Certs', icon: <FaCertificate /> },
  { id: 'achievements', label: 'Awards', icon: <FaTrophy /> },
  { id: 'positionsOfResponsibility', label: 'Leadership', icon: <FaUsers /> },
];

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

  const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm({
    defaultValues: data,
  });

  const formData = watch();
  const debouncedFormData = useDebounce(formData, 800);

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [activeSection, setActiveSection] = useState('identity');
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [currentMetrics, setCurrentMetrics] = useState(performanceTracker.getAverageMetrics());

  const debouncedJD = useDebounce(jobDescription, 800);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!showFormUI) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showFormUI]);

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
    const { fullName, email, title } = formData.personalInformation || {};
    if (!fullName || !email || !title) {
      return toast.error("Please fill in required fields: Name, Email, and Job Title", {
        icon: "⚠️",
      });
    }

    setData(formData);
    setShowFormUI(false);
    setShowResumeUI(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed text-center">
              Our AI engine transforms your experience into a high-performance resume draft. 
              <span className="block mt-2 text-primary/80 font-medium">The more detail you provide, the better the results.</span>
            </p>
          </div>

          <div className="w-full max-w-2xl group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-20 group-hover:opacity-40 transition-opacity rounded-3xl"></div>
              <div className="relative bg-base-200 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea w-full h-48 md:h-64 bg-transparent border-none text-base text-slate-200 focus:ring-0 p-6 md:p-8 leading-relaxed resize-none placeholder:text-slate-600"
                  placeholder="e.g. I am a Senior Frontend Engineer with 8 years of experience building scalable React applications..."
                />
                
                <div className="absolute top-4 right-6 flex items-center gap-3">
                  {description.length > 0 && (
                    <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/5 backdrop-blur-md">
                      <div className={`w-1.5 h-1.5 rounded-full ${description.length < 50 ? 'bg-error animate-pulse' : description.length < 200 ? 'bg-warning' : 'bg-success'}`}></div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {description.length < 50 ? 'Weak' : description.length < 200 ? 'Good' : 'Excellent'}
                      </span>
                    </div>
                  )}
                  <span className={`text-[10px] font-mono ${description.length < 50 ? 'text-slate-500' : 'text-primary'}`}>
                    {description.length} chars
                  </span>
                </div>

                <div className="p-4 bg-white/5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex flex-col gap-1 md:ml-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recommended: 200+ characters</span>
                  </div>
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
        <>
          {/* Section Navigation Dock - Desktop Floating Rail (Outside animated div to fix visibility/clipping) */}
          <div className="hidden lg:flex fixed left-[max(1rem,calc(50vw-740px))] top-1/2 -translate-y-1/2 flex-col gap-2 p-2 bg-base-200/50 backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl z-[150] transition-all">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all group relative ${activeSection === section.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
              >
                <span className="text-sm">{section.icon}</span>
                <div className="absolute left-14 px-3 py-1.5 bg-base-300 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
                  {section.label}
                </div>
              </button>
            ))}
          </div>

          <div className="relative animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
              <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 space-y-4 md:space-y-6">
                {/* Mobile Sticky Navigation Dock (top-16 to avoid Navbar) */}
                <div className="lg:hidden sticky top-16 z-[80] -mx-4 px-4 py-3 bg-base-300/80 backdrop-blur-lg border-b border-white/5 mb-4 overflow-x-auto no-scrollbar flex items-center gap-2">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${activeSection === section.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/5 border-transparent text-slate-500'}`}
                    >
                      <span className="text-xs">{section.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{section.label}</span>
                    </button>
                  ))}
                </div>

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

                <FormSection id="identity" title="Identity">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="form-control md:col-span-2">
                      <label className={`label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest ml-1 ${errors.personalInformation?.fullName ? 'text-error' : 'text-slate-500'}`}>Full Name *</label>
                      <input {...register("personalInformation.fullName", { required: "Full Name is required" })} className={`input input-bordered h-10 bg-base-100 text-sm ${errors.personalInformation?.fullName ? 'border-error' : 'border-white/5'}`} placeholder="John Doe" />
                    </div>
                    <div className="form-control">
                      <label className={`label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest ml-1 ${errors.personalInformation?.title ? 'text-error' : 'text-slate-500'}`}>Job Title *</label>
                      <input {...register("personalInformation.title", { required: "Job Title is required" })} className={`input input-bordered h-10 bg-base-100 text-sm ${errors.personalInformation?.title ? 'border-error' : 'border-white/5'}`} placeholder="Software Engineer" />
                    </div>
                    <div className="form-control">
                      <label className={`label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest ml-1 ${errors.personalInformation?.email ? 'text-error' : 'text-slate-500'}`}>Email *</label>
                      <input {...register("personalInformation.email", { required: "Email is required" })} className={`input input-bordered h-10 bg-base-100 text-sm ${errors.personalInformation?.email ? 'border-error' : 'border-white/5'}`} placeholder="john@example.com" />
                    </div>
                    <div className="form-control">
                      <label className={`label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest ml-1 ${errors.personalInformation?.location ? 'text-error' : 'text-slate-500'}`}>Location *</label>
                      <input {...register("personalInformation.location", { required: "Location is required" })} className={`input input-bordered h-10 bg-base-100 text-sm ${errors.personalInformation?.location ? 'border-error' : 'border-white/5'}`} placeholder="New York, NY" />
                    </div>
                    <div className="form-control">
                      <label className="label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                      <input {...register("personalInformation.phoneNumber")} className="input input-bordered h-10 border-white/5 bg-base-100 text-sm" placeholder="+1 234 567 890" />
                    </div>
                  </div>
                </FormSection>

                <RenderFieldArray id="socialLinks" fields={fieldArrays.socialLinks} label="Professional Links" name="socialLinks" keys={["label", "url"]} register={register} watch={watch} errors={errors} />

                <FormSection id="summary" title="Professional Summary">
                  <textarea {...register("summary", { required: "Professional Summary is required" })} className={`textarea textarea-bordered w-full h-24 bg-base-100 text-sm leading-relaxed ${errors.summary ? 'border-error' : 'border-white/5'}`} placeholder="Brief overview of your career..." />
                </FormSection>

                <RenderFieldArray id="skills" fields={fieldArrays.skills} label="Technical Skills" name="skills" keys={["category", "skills"]} register={register} watch={watch} errors={errors} />
                <RenderFieldArray id="experience" fields={fieldArrays.experience} label="Work Experience" name="experience" keys={["jobTitle", "company", "duration", "responsibility"]} register={register} watch={watch} errors={errors} />      
                <RenderFieldArray id="education" fields={fieldArrays.education} label="Education" name="education" keys={["degree", "university", "location", "graduationYear"]} register={register} watch={watch} errors={errors} />        
                <RenderFieldArray id="projects" fields={fieldArrays.projects} label="Key Projects" name="projects" keys={["title", "description", "technologiesUsed"]} register={register} watch={watch} errors={errors} />
                <RenderFieldArray id="certifications" fields={fieldArrays.certifications} label="Certifications" name="certifications" keys={["title", "issuer", "date"]} register={register} watch={watch} errors={errors} />
                <RenderFieldArray id="achievements" fields={fieldArrays.achievements} label="Awards & Achievements" name="achievements" keys={["award", "organization", "date"]} register={register} watch={watch} errors={errors} />
                <RenderFieldArray id="positionsOfResponsibility" fields={fieldArrays.positionsOfResponsibility} label="Leadership & Responsibility" name="positionsOfResponsibility" keys={["title", "organization", "duration", "description"]} register={register} watch={watch} errors={errors} />

                <div className="flex lg:hidden flex-col gap-4 pt-6 pb-12">
                  <button type="button" onClick={handleSubmit(onSubmit)} className="btn btn-primary w-full rounded-2xl font-black shadow-lg shadow-primary/20">Preview & Export</button>
                  <button type="button" onClick={resetGenerator} className="btn btn-ghost w-full text-slate-500 font-bold">Reset</button>
                </div>
              </form>

              {/* Live Preview Panel */}
              <div className="hidden lg:flex lg:col-span-5 sticky top-20 h-[calc(100vh-100px)] flex-col bg-base-300/30 rounded-3xl border border-white/5 overflow-hidden shadow-2xl transition-all">
                <div className="w-full p-4 bg-white/5 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                  <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-success animate-pulse"></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Preview</span></div>
                  <div className="flex items-center gap-2">
                    <button onClick={resetGenerator} className="btn btn-ghost btn-xs h-8 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[9px]">Reset</button>
                    <div className="flex items-center bg-primary/10 rounded-lg p-0.5 border border-primary/20">
                      <button onClick={handleSubmit(onSubmit)} className="btn btn-primary btn-xs h-7 px-4 rounded-md font-black text-[10px] uppercase tracking-widest">View Result</button>
                      <div className="w-px h-4 bg-primary/20 mx-1"></div>
                      <button onClick={async () => { await handleSubmit((validData) => { setData(validData); setShowFormUI(false); setShowResumeUI(true); })(); }} className="btn btn-ghost btn-xs h-7 px-3 rounded-md font-bold text-[10px] text-primary uppercase tracking-widest">Download</button>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full overflow-y-auto p-4 md:p-8 custom-scrollbar bg-slate-900/50 backdrop-blur-sm flex justify-center">      
                   <div className="w-full max-w-[210mm] bg-white shadow-2xl origin-top h-fit mb-10"><Resume data={debouncedFormData} hideDownload={true} previewMode={true} /></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showResumeUI && (
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 animate-fadeIn pb-20">      
          <div className="bg-base-200 p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">ATS Optimization</h3>
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the target Job Description..." className="textarea textarea-bordered w-full h-32 bg-base-100 border-white/10 text-sm mt-4" />
          </div>
          <Resume data={data} />
          <div className="flex justify-center gap-4 pt-6">
            <button onClick={() => { setShowResumeUI(false); setShowFormUI(true); }} className="btn btn-ghost text-slate-400 font-bold hover:text-white"><FaUndo className="mr-2 text-xs" /> Edit Draft</button>
            <button disabled={isSaving} onClick={async () => { setIsSaving(true); try { await saveResumeToDB(data, atsResult?.score || 0); toast.success("Saved to cloud"); } catch { toast.error("Database connection failure"); } finally { setIsSaving(false); } }} className="btn btn-primary px-8 rounded-xl font-black shadow-lg shadow-primary/20">{isSaving ? <span className="loading loading-spinner loading-xs"></span> : <FaSave className="mr-2" />}{isSaving ? "Saving..." : "Save Progress"}</button>
          </div>
        </div>
      )}

      {/* Mobile Fullscreen Preview FAB & Overlay */}
      {showFormUI && (
        <>
          <button onClick={() => setShowMobilePreview(true)} className="lg:hidden fixed bottom-6 right-6 z-[90] btn btn-circle btn-primary shadow-2xl shadow-primary/40 animate-bounce-subtle"><FaMagic className="text-xl" /></button>
          {showMobilePreview && (
            <div className="fixed inset-0 z-[200] bg-base-300 flex flex-col animate-fadeIn">
              <div className="h-16 px-4 bg-base-200 border-b border-white/5 flex items-center justify-between sticky top-0 z-[210]">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-success animate-pulse"></div><span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Live Preview</span></div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { handleSubmit((validData) => { setData(validData); setShowFormUI(false); setShowResumeUI(true); setShowMobilePreview(false); })(); }} className="btn btn-primary btn-xs h-8 px-4 rounded-lg font-black text-[10px] uppercase tracking-widest">Export</button>
                  <button onClick={() => setShowMobilePreview(false)} className="btn btn-ghost btn-circle btn-sm text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50"><div className="w-full max-w-[210mm] mx-auto bg-white shadow-2xl"><Resume data={debouncedFormData} hideDownload={true} previewMode={true} /></div></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenerateResume;
