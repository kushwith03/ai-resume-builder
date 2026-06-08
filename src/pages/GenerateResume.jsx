import { useState, useMemo, useCallback, useEffect, useRef } from "react";
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

/**
 * ScaledPreview component ensures the Resume renders at full A4 dimensions
 * but scales down visually to fit its container, maintaining exact proportions.
 */
const ScaledPreview = ({ children, containerClassName = "" }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const targetWidth = 210 * 3.7795275591; // 210mm in pixels at 96dpi
        const newScale = Math.min(1, (containerWidth - 32) / targetWidth);
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className={`w-full flex justify-center items-start overflow-hidden ${containerClassName}`}>
      <div style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: "top center",
        width: "210mm",
        height: `${297 * scale}mm`, // Adjust wrapper height to prevent excessive bottom gap
        transition: "transform 0.2s ease-out"
      }}>
        {children}
      </div>
    </div>
  );
};

const GenerateResume = () => {
  const [data, setData] = useState({
    personalInformation: { fullName: "", title: "", email: "", location: "", phoneNumber: "" },
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
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!showFormUI) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section.id);
          break;
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

  const handleGenerate = async () => {
    if (description.length < 30) return toast.error("Please provide at least 30 characters");
    performanceTracker.startMeasure();
    setLoading(true);
    try {
      const response = await generateResume(description);
      reset(response.data);
      setShowFormUI(true);
      setShowPromptInput(false);
      toast.success("AI draft created successfully");
    } catch (error) {
      console.error("AI Generation failed:", error);
      toast.error(error.response?.data?.error || "AI service temporarily unavailable.");
    } finally {
      setLoading(false);
      performanceTracker.endMeasure("AI_Generation");
      setCurrentMetrics(performanceTracker.getAverageMetrics());
    }
  };

  const onSubmit = useCallback((formData) => {
    const { fullName, email, title } = formData.personalInformation || {};
    if (!fullName || !email || !title) return toast.error("Please fill in Name, Email, and Job Title");
    setData(formData);
    setShowFormUI(false);
    setShowResumeUI(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetGenerator = () => {
    setShowPromptInput(true);
    setShowFormUI(false);
    setShowResumeUI(false);
    setDescription("");
  };

  return (
    <div className={`mx-auto p-4 md:p-8 min-h-[90vh] pb-24 transition-all duration-500 ${showFormUI ? 'max-w-[1600px]' : 'max-w-4xl'}`}>
      <GenerationLoader isLoading={loading} onCancel={() => setLoading(false)} />
      
      {showPromptInput && (
        <div className="flex flex-col items-center justify-center py-10 gap-8 animate-fadeIn max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-white">Create Your <span className="text-primary">Resume</span></h1>
          <div className="w-full relative bg-base-200 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea w-full h-48 md:h-64 bg-transparent border-none text-sm text-slate-200 p-6 leading-relaxed resize-none"
              placeholder="Describe yourself or paste existing resume content..."
            />
            <div className="p-4 bg-white/5 border-t border-white/5 flex justify-between items-center">
              <span className="text-[10px] text-slate-500">{description.length} characters</span>
              <button onClick={handleGenerate} disabled={loading || description.length < 30} className="btn btn-primary px-8 rounded-xl font-black">
                {loading ? <span className="loading loading-spinner"></span> : "Generate Resume"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showFormUI && (
        <div className="animate-fadeIn">
          {/* Section Navigation */}
          <div className="sticky top-[64px] z-[80] -mx-4 md:-mx-8 px-4 md:px-8 py-3 bg-base-300/80 backdrop-blur-lg border-b border-white/5 mb-6 overflow-x-auto no-scrollbar flex items-center gap-2">
            {SECTIONS.map((section) => (
              <button key={section.id} type="button" onClick={() => scrollToSection(section.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${activeSection === section.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/5 border-transparent text-slate-500'}`}>
                <span className="text-xs">{section.icon}</span>
                <span className="text-[10px] font-black uppercase">{section.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Editor */}
            <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Editor</h2>
              <FormSection id="identity" title="Identity">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="form-control md:col-span-2">
                    <label className="label-text mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">Full Name *</label>
                    <input {...register("personalInformation.fullName", { required: true })} className="input input-bordered h-9 px-3 bg-base-100 text-xs" placeholder="John Doe" />
                  </div>
                  <div className="form-control">
                    <label className="label-text mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">Job Title *</label>
                    <input {...register("personalInformation.title", { required: true })} className="input input-bordered h-9 px-3 bg-base-100 text-xs" placeholder="Software Engineer" />
                  </div>
                  <div className="form-control">
                    <label className="label-text mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">Email *</label>
                    <input {...register("personalInformation.email", { required: true })} className="input input-bordered h-9 px-3 bg-base-100 text-xs" placeholder="john@example.com" />
                  </div>
                </div>
              </FormSection>

              <RenderFieldArray id="socialLinks" fields={fieldArrays.socialLinks} label="Professional Links" name="socialLinks" keys={["label", "url"]} register={register} watch={watch} errors={errors} />
              <FormSection id="summary" title="Professional Summary">
                <textarea {...register("summary", { required: true })} className="textarea textarea-bordered w-full h-20 min-h-[80px] py-2 px-3 bg-base-100 text-xs leading-relaxed" placeholder="Overview..." />
              </FormSection>
              <RenderFieldArray id="skills" fields={fieldArrays.skills} label="Technical Skills" name="skills" keys={["category", "skills"]} register={register} watch={watch} errors={errors} />
              <RenderFieldArray id="experience" fields={fieldArrays.experience} label="Work Experience" name="experience" keys={["jobTitle", "company", "duration", "responsibility"]} register={register} watch={watch} errors={errors} />
              <RenderFieldArray id="education" fields={fieldArrays.education} label="Education" name="education" keys={["degree", "university", "location", "graduationYear"]} register={register} watch={watch} errors={errors} />
              <RenderFieldArray id="projects" fields={fieldArrays.projects} label="Key Projects" name="projects" keys={["title", "description", "technologiesUsed"]} register={register} watch={watch} errors={errors} />
              <RenderFieldArray id="certifications" fields={fieldArrays.certifications} label="Certifications" name="certifications" keys={["title", "issuer", "date"]} register={register} watch={watch} errors={errors} />
              <RenderFieldArray id="achievements" fields={fieldArrays.achievements} label="Awards & Achievements" name="achievements" keys={["award", "organization", "date"]} register={register} watch={watch} errors={errors} />
              <RenderFieldArray id="positionsOfResponsibility" fields={fieldArrays.positionsOfResponsibility} label="Leadership & Responsibility" name="positionsOfResponsibility" keys={["title", "organization", "duration", "description"]} register={register} watch={watch} errors={errors} />

              <div className="flex flex-col gap-4 pt-6">
                <button type="button" onClick={handleSubmit(onSubmit)} className="btn btn-primary w-full rounded-2xl font-black shadow-lg">Preview & Export</button>
                <button type="button" onClick={resetGenerator} className="btn btn-ghost w-full text-slate-500">Reset</button>
              </div>
            </form>

            {/* Live Scaled Preview */}
            <div className="hidden lg:flex lg:col-span-5 sticky top-20 h-[calc(100vh-120px)] flex-col bg-base-300/30 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="w-full p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-success animate-pulse"></div><span className="text-[10px] font-black uppercase text-slate-400">Live A4 Preview</span></div>
                <button onClick={handleSubmit(onSubmit)} className="btn btn-primary btn-xs px-4 rounded-md font-black text-[10px] uppercase">View Result</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50 custom-scrollbar">
                <ScaledPreview>
                  <Resume data={debouncedFormData} hideDownload={true} previewMode={true} />
                </ScaledPreview>
              </div>
            </div>
          </div>
        </div>
      )}

      {showResumeUI && (
        <div className="max-w-5xl mx-auto space-y-12 animate-fadeIn pb-20">
          <div className="bg-base-200 p-8 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-4">ATS Optimization</h3>
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste Job Description..." className="textarea textarea-bordered w-full h-32 bg-base-100" />
          </div>
          
          <ScaledPreview containerClassName="bg-slate-900/20 p-8 rounded-3xl border border-white/5">
            <Resume data={data} />
          </ScaledPreview>

          <div className="flex justify-center gap-4 pt-6">
            <button onClick={() => { setShowResumeUI(false); setShowFormUI(true); }} className="btn btn-ghost text-slate-400 font-bold"><FaUndo className="mr-2" /> Edit Draft</button>
            <button disabled={loading} onClick={async () => { try { await saveResumeToDB(data, atsResult?.score || 0); toast.success("Saved to cloud"); } catch { toast.error("Database failure"); } }} className="btn btn-primary px-8 rounded-xl font-black shadow-lg"><FaSave className="mr-2" /> Save Progress</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateResume;
