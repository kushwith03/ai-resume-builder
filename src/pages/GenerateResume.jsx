import { useState, useMemo, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { FaSave, FaUndo, FaMagic, FaFilePdf } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { generateResume, trackAnalytics, saveResumeToDB } from "../api/ResumeService";
import { useForm, useFieldArray } from "react-hook-form";
import Resume from "../Components/Resume";
import ResumePDF from "../Components/ResumePDF";
import { performanceTracker } from "../utils/performanceTracker";
import { calculateATSScore } from "../services/atsService";
import { useDebounce } from "../hooks/useDebounce";
import FormSection, { RenderFieldArray } from "../Components/ResumeFormSections";
import GenerationLoader from "../Components/GenerationLoader";
import { SECTIONS } from "../utils/constants";
import ScaledPreview from "../Components/Preview/ScaledPreview";
import PromptInput from "../Components/Editor/PromptInput";
import SectionNav from "../Components/Editor/SectionNav";
import HowItWorks from "../Components/HowItWorks";

const GenerateResume = () => {
  const [data, setData] = useState({
    personalInformation: { fullName: "", email: "", location: "", phoneNumber: "" },
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
    mode: "onTouched",
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
    const editorScroll = document.getElementById('editor-panel');
    if (element && editorScroll) {
      editorScroll.scrollTo({
        top: element.offsetTop - 10,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!showFormUI) return;
    const editorScroll = document.getElementById('editor-panel');
    if (!editorScroll) return;

    const handleScroll = () => {
      const scrollPosition = editorScroll.scrollTop + 80;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    editorScroll.addEventListener('scroll', handleScroll);
    return () => editorScroll.removeEventListener('scroll', handleScroll);
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
    setData(formData);
    setShowFormUI(false);
    setShowResumeUI(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentMetrics(performanceTracker.getAverageMetrics());
    trackAnalytics("form_submit_preview");
  }, []);

  const [hasDraft, setHasDraft] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('resume_draft')) setHasDraft(true);
  }, []);

  useEffect(() => {
    if (showFormUI && debouncedFormData && Object.keys(debouncedFormData).length > 0) {
      localStorage.setItem('resume_draft', JSON.stringify(debouncedFormData));
    }
  }, [debouncedFormData, showFormUI]);

  const handleRestoreDraft = () => {
    try {
      const draft = JSON.parse(localStorage.getItem('resume_draft'));
      if (draft) {
        setData(draft);
        reset(draft);
        setShowPromptInput(false);
        setShowFormUI(true);
        toast.success("Draft restored");
      }
    } catch {
      localStorage.removeItem('resume_draft');
    }
  };

  const handleGenerate = async () => {
    if (description.length < 30) return toast.error("Too short for AI");
    performanceTracker.startMeasure();
    setLoading(true);
    try {
      const response = await generateResume(description);
      reset(response.data);
      setShowFormUI(true);
      setShowPromptInput(false);
      trackAnalytics("generate_resume_success");
    } catch (error) {
      toast.error(error.response?.data?.error || "AI unavailable");
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
    setDescription("");
  };

  return (
    <div className={`mx-auto transition-all duration-500 ${showFormUI ? 'w-full max-w-[1600px] h-[calc(100vh-64px)] overflow-hidden' : 'max-w-4xl min-h-[90vh] p-4 md:p-8'}`}>
      <GenerationLoader isLoading={loading} onCancel={() => setLoading(false)} />
      
      {showPromptInput && (
        <>
          <PromptInput 
            hasDraft={hasDraft}
            setHasDraft={setHasDraft}
            handleRestoreDraft={handleRestoreDraft}
            description={description}
            setDescription={setDescription}
            handleGenerate={handleGenerate}
            loading={loading}
          />
          <HowItWorks />
        </>
      )}

      {showFormUI && (
        <div className="flex flex-col h-full overflow-hidden">
          <SectionNav activeSection={activeSection} onNavClick={scrollToSection} />
          
          <div className="flex-1 overflow-hidden px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full relative">
              <form 
                id="editor-panel"
                onSubmit={handleSubmit(onSubmit)} 
                className="lg:col-span-6 xl:col-span-7 h-full overflow-y-auto custom-scrollbar pr-2 space-y-4 pt-4 pb-32"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Editor</h2>
                  {atsResult && (
                    <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-slate-500">ATS Match</span>
                      <div className={`text-sm font-black ${atsResult.score >= 70 ? 'text-success' : atsResult.score >= 40 ? 'text-warning' : 'text-error'}`}>
                        {atsResult.score}%
                      </div>
                    </div>
                  )}
                </div>

                <FormSection id="identity" title="Identity">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control md:col-span-2">
                      <label className={`label-text mb-1 text-[9px] font-bold uppercase tracking-widest ml-1 ${errors.personalInformation?.fullName ? 'text-error' : 'text-slate-500'}`}>Full Name <span className="text-error">*</span></label>
                      <input {...register("personalInformation.fullName", { required: "Full Name is required" })} className={`input input-bordered h-9 px-3 bg-base-100 text-xs transition-all ${errors.personalInformation?.fullName ? 'border-error ring-1 ring-error/20' : 'border-white/5 focus:border-primary/50'}`} placeholder="e.g. Full Name" />
                      {errors.personalInformation?.fullName && <span className="text-error text-[9px] mt-0.5 ml-1 font-bold">{errors.personalInformation.fullName.message}</span>}
                    </div>
                    <div className="form-control">
                      <label className={`label-text mb-1 text-[9px] font-bold uppercase tracking-widest ml-1 ${errors.personalInformation?.email ? 'text-error' : 'text-slate-500'}`}>Email <span className="text-error">*</span></label>
                      <input {...register("personalInformation.email", { required: "Email is required" })} className={`input input-bordered h-9 px-3 bg-base-100 text-xs transition-all ${errors.personalInformation?.email ? 'border-error ring-1 ring-error/20' : 'border-white/5 focus:border-primary/50'}`} placeholder="e.g. Email Address" />
                      {errors.personalInformation?.email && <span className="text-error text-[9px] mt-0.5 ml-1 font-bold">{errors.personalInformation.email.message}</span>}
                    </div>
                    <div className="form-control">
                      <label className={`label-text mb-1 text-[9px] font-bold uppercase tracking-widest ml-1 ${errors.personalInformation?.location ? 'text-error' : 'text-slate-500'}`}>Location <span className="text-error">*</span></label>
                      <input {...register("personalInformation.location", { required: "Location is required" })} className={`input input-bordered h-9 px-3 bg-base-100 text-xs transition-all ${errors.personalInformation?.location ? 'border-error ring-1 ring-error/20' : 'border-white/5 focus:border-primary/50'}`} placeholder="e.g. City, Country" />
                      {errors.personalInformation?.location && <span className="text-error text-[9px] mt-0.5 ml-1 font-bold">{errors.personalInformation.location.message}</span>}
                    </div>
                    <div className="form-control">
                      <label className="label-text mb-1 text-[9px] font-bold uppercase tracking-widest ml-1 text-slate-500">Phone</label>
                      <input {...register("personalInformation.phoneNumber")} className="input input-bordered h-9 px-3 bg-base-100 text-xs transition-all border-white/5 focus:border-primary/50" placeholder="e.g. Phone Number" />
                    </div>
                  </div>
                </FormSection>

                <RenderFieldArray id="socialLinks" fields={fieldArrays.socialLinks} label="Professional Links" name="socialLinks" keys={["url"]} register={register} watch={watch} errors={errors} />
                <FormSection id="summary" title="Summary">
                  <div className="form-control">
                    <label className={`label-text mb-1 text-[9px] font-bold uppercase tracking-widest ml-1 ${errors.summary ? 'text-error' : 'text-slate-500'}`}>Professional Summary <span className="text-error">*</span></label>
                    <textarea {...register("summary", { required: "Professional Summary is required" })} className={`textarea textarea-bordered w-full h-20 min-h-[80px] py-2 px-3 bg-base-100 text-xs leading-relaxed transition-all ${errors.summary ? 'border-error ring-1 ring-error/20' : 'border-white/5 focus:border-primary/50'}`} placeholder="Enter professional summary..." />
                    {errors.summary && <span className="text-error text-[9px] mt-0.5 ml-1 font-bold">{errors.summary.message}</span>}
                  </div>
                </FormSection>
                <RenderFieldArray id="skills" fields={fieldArrays.skills} label="Skills" name="skills" keys={["category", "skills"]} register={register} watch={watch} errors={errors} />
                <RenderFieldArray id="experience" fields={fieldArrays.experience} label="Experience" name="experience" keys={["jobTitle", "company", "duration", "responsibility"]} register={register} watch={watch} errors={errors} />      
                <RenderFieldArray id="education" fields={fieldArrays.education} label="Education" name="education" keys={["degree", "university", "location", "graduationYear", "academicScore"]} register={register} watch={watch} errors={errors} />        
                <RenderFieldArray id="projects" fields={fieldArrays.projects} label="Projects" name="projects" keys={["title", "description", "technologiesUsed", "githubUrl", "liveUrl"]} register={register} watch={watch} errors={errors} />
                <RenderFieldArray id="certifications" fields={fieldArrays.certifications} label="Certs" name="certifications" keys={["title", "issuer", "date"]} register={register} watch={watch} errors={errors} />
                <RenderFieldArray id="achievements" fields={fieldArrays.achievements} label="Awards" name="achievements" keys={["award", "organization", "date"]} register={register} watch={watch} errors={errors} />
                <RenderFieldArray id="positionsOfResponsibility" fields={fieldArrays.positionsOfResponsibility} label="Leadership" name="positionsOfResponsibility" keys={["title", "organization", "duration", "description"]} register={register} watch={watch} errors={errors} />

                <div className="flex lg:hidden flex-col gap-4 pt-6 pb-12">
                  <button type="button" onClick={handleSubmit(onSubmit)} className="btn btn-primary w-full rounded-2xl font-black">Preview & Export</button>
                  <button type="button" onClick={resetGenerator} className="btn btn-ghost w-full text-slate-500">Reset</button>
                </div>
              </form>

              <div className="hidden lg:flex lg:col-span-6 xl:col-span-5 h-full flex-col bg-base-300/30 rounded-t-3xl border-x border-t border-white/5 overflow-hidden shadow-2xl">
                <div className="w-full p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-success animate-pulse"></div><span className="text-[10px] font-black uppercase text-slate-400">Live Preview</span></div>
                  <div className="flex items-center gap-2">
                    <button onClick={resetGenerator} className="btn btn-ghost btn-xs text-slate-400 font-bold uppercase text-[9px]">Reset</button>
                    <button onClick={handleSubmit(onSubmit)} className="btn btn-primary btn-xs px-4 rounded-md font-black text-[10px] uppercase">Download</button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto bg-slate-900/50 flex justify-center items-start pt-10 custom-scrollbar">      
                  <ScaledPreview>
                    <div className="bg-white shadow-2xl origin-top h-fit mb-10"><Resume data={debouncedFormData} hideDownload={true} previewMode={true} /></div>
                  </ScaledPreview>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showResumeUI && (
        <div className="max-w-5xl mx-auto space-y-4 animate-fadeIn pb-20 px-4">      
          <div className="bg-base-200 p-4 md:p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">ATS Optimization</h3>
              {atsResult && (
                <div className={`text-sm font-black px-3 py-1 rounded-lg bg-white/5 border border-white/10 ${atsResult.score >= 70 ? 'text-success' : atsResult.score >= 40 ? 'text-warning' : 'text-error'}`}>
                  {atsResult.score}% Match
                </div>
              )}
            </div>
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the target Job Description..." className="textarea textarea-bordered w-full h-24 bg-base-100 border-white/10 text-sm" />
          </div>

          <div className="flex justify-end pb-1">
            <button 
              onClick={() => { setShowResumeUI(false); setShowFormUI(true); }} 
              className="btn btn-outline btn-sm border-white/10 text-slate-400 hover:bg-white/5 hover:text-white hover:border-white/20 px-6 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <FaUndo className="text-xs" /> 
              <span className="text-xs uppercase tracking-wide">Edit Draft</span>
            </button>
          </div>

          <ScaledPreview containerClassName="bg-slate-900/20 p-2 md:p-4 rounded-3xl border border-white/5 shadow-2xl">
            <div className="bg-white shadow-2xl origin-top"><Resume data={data} hideDownload={true} /></div>
          </ScaledPreview>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-4 w-full max-w-2xl mx-auto">
            <PDFDownloadLink
              document={<ResumePDF data={data} />}
              fileName={`${data.personalInformation?.fullName || 'Resume'}.pdf`}
              className="btn btn-primary px-10 rounded-xl font-black shadow-lg shadow-primary/20 flex items-center gap-2 flex-1 h-12 text-sm"
            >
              {({ loading }) => (
                <>
                  <FaFilePdf className={loading ? "animate-pulse" : ""} />
                  {loading ? "Preparing..." : "Download Professional PDF"}
                </>
              )}
            </PDFDownloadLink>

            <button 
              disabled={isSaving} 
              onClick={async () => { 
                setIsSaving(true); 
                try { 
                  await saveResumeToDB(data, atsResult?.score || 0); 
                  toast.success("Saved"); 
                } catch { 
                  toast.error("Failed"); 
                } finally { 
                  setIsSaving(false); 
                } 
              }} 
              className="btn btn-outline border-white/10 text-slate-400 font-bold hover:bg-white/5 hover:text-white px-10 rounded-xl transition-all flex-1 h-12 text-sm"
            >
              {isSaving ? <span className="loading loading-spinner loading-xs"></span> : <FaSave className="mr-2" />}
              {isSaving ? "Save Progress" : "Save Progress"}
            </button>
          </div>
        </div>
      )}

      {showFormUI && (
        <>
          <button onClick={() => setShowMobilePreview(true)} className="lg:hidden fixed bottom-6 right-6 z-[90] btn btn-circle btn-primary shadow-2xl animate-bounce-subtle"><FaMagic className="text-xl" /></button>
          {showMobilePreview && (
            <div className="fixed inset-0 z-[200] bg-base-300 flex flex-col animate-fadeIn">
              <div className="h-16 px-4 bg-base-200 border-b border-white/5 flex items-center justify-between sticky top-0 z-[210]">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-success animate-pulse"></div><span className="text-[10px] font-black uppercase text-white">Live Preview</span></div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { handleSubmit((validData) => { setData(validData); setShowFormUI(false); setShowResumeUI(true); setShowMobilePreview(false); })(); }} className="btn btn-primary btn-xs h-8 px-4 rounded-lg font-black text-[10px]">Export</button>
                  <button onClick={() => setShowMobilePreview(false)} className="btn btn-ghost btn-circle btn-sm text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50">
                <ScaledPreview>
                  <div className="bg-white shadow-2xl origin-top"><Resume data={debouncedFormData} hideDownload={true} previewMode={true} /></div>
                </ScaledPreview>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenerateResume;
GenerateResume;
